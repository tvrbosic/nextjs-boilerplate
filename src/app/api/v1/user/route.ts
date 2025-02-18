// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import { prisma } from '@/prisma/prisma';
import {
  ApiResponse,
  ApiErrorResponse,
  ApiInternalServerErrorResponse,
} from '@/utility/response/response';

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();
    return ApiResponse({
      status: 200,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error) {
    console.error('Error fetcing users:', error);
    return ApiInternalServerErrorResponse();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, role, password } = body;

    if (!email) {
      return ApiErrorResponse({
        status: 400,
        message: 'Email is mandatory field',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || 'USER',
      },
    });

    return ApiResponse({
      status: 201,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return ApiInternalServerErrorResponse();
  }
}
