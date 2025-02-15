// LIBRARY
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// APP
import { prisma } from '@/prisma/prisma';
import { createSession } from '@/utility/session/session';
import {
  ApiResponse,
  ApiErrorResponse,
  ApiInternalServerErrorResponse,
} from '@/utility/response/response';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return ApiErrorResponse({
        status: 400,
        message: 'Email and password are required!',
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return ApiErrorResponse({
        status: 401,
        message: 'Invalid credentials!',
      });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return ApiErrorResponse({
        status: 401,
        message: 'Invalid credentials!',
      });
    }

    // Create JWT token and user session
    const token = await createSession({
      userGuid: user.guid,
      role: user.role,
    });

    // Send response with JWT token
    return ApiResponse({ status: 200, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return ApiInternalServerErrorResponse();
  }
}
