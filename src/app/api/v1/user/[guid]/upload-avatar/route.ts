// LIBRARY
import path from 'path';
import { mkdir } from 'fs';
import { prisma } from '@/prisma/prisma';
import { writeFile, rm } from 'fs/promises';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@/utility/response/response';
import { baseModelOmitFields, userOmitFields } from '@/prisma/utility';

// TYPES
import { IGetUserDTO, IPostUploadAvatarParams } from '@/app/api/v1/user/types';

// ENV
const MEDIA_UPLOADS_DIR = process.env.MEDIA_UPLOADS_PATH;
const MEDIA_SERVE_PATH = process.env.MEDIA_SERVE_PATH;
const APP_BASE_URL = process.env.APP_BASE_URL;

export const POST = withApiErrorWrapper(async (req: Request, { params }: IPostUploadAvatarParams) => {
  const guid = (await params).guid;
  const formData = await req.formData();
  const file = formData.get('file') as File;

  const activeUser = await prisma.user.findUnique({
    omit: {
      ...baseModelOmitFields(),
      ...userOmitFields(),
    },
    where: {
      guid,
    },
  });

  if (activeUser!.guid !== guid) {
    return ApiBadRequestResponse({
      message: 'You can only update your own profile',
    });
  }

  if (!file) {
    return ApiBadRequestResponse({
      message: 'Invalid file uploaded',
    });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), MEDIA_UPLOADS_DIR!);

  // Ensure uploads folder exists
  mkdir(uploadDir, { recursive: true }, (err) => {
    if (err) {
      console.error('Failed to create uploads folder', err);
      throw new Error('Failed to create uploads folder');
    }
  });

  // Construct file name and path
  const ext = path.extname(file.name);
  const filename = `${crypto.randomUUID()}${ext}`;
  const filePath = path.join(uploadDir, filename);

  const updatedUser: IGetUserDTO = await prisma.user.update({
    omit: {
      ...baseModelOmitFields(),
      ...userOmitFields(),
    },
    where: {
      guid,
    },
    data: {
      avatarImageFilename: filename,
      avatarImageUrl: `${APP_BASE_URL}${MEDIA_SERVE_PATH}${filename}`,
    },
  });

  // Write the file to the server
  await writeFile(filePath, buffer);

  // Remove the old avatar image if it exists
  if (activeUser?.avatarImageFilename) {
    const existingFilePath = path.join(uploadDir, activeUser.avatarImageFilename!);
    await rm(existingFilePath, { force: true });
  }

  return ApiCreatedResponse<IGetUserDTO>({
    message: 'User avatar image uploaded successfully',
    data: updatedUser,
  });
});
