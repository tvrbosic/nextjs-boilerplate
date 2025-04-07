// LIBRARY
import path from 'path';
import { mkdir } from 'fs';
import { writeFile } from 'fs/promises';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@/utility/response/response';

// ENV
const MEDIA_UPLOADS_DIR = process.env.MEDIA_UPLOADS_PATH;

export const POST = withApiErrorWrapper(async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get('file') as File;

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

  await writeFile(filePath, buffer);

  return ApiCreatedResponse({
    message: 'File uploaded successfully',
  });
});
