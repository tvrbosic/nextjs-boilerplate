// LIBRARY
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// APP
import { prisma } from '@/prisma/prisma';
import {
  ApiResponse,
  ApiErrorResponse,
  ApiInternalServerErrorResponse,
} from '@/utility/response/response';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return ApiErrorResponse({
        status: 400,
        message: 'All fields are required',
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return ApiErrorResponse({ status: 400, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, firstName, lastName },
    });

    return ApiResponse({
      status: 201,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    console.error(error);
    return ApiInternalServerErrorResponse();
  }
}
