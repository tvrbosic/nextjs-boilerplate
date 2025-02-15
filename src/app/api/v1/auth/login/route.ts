// LIBRARY
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// APP
import { prisma } from '@/prisma/prisma';
import { createSession } from '@/utility/session/session';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required!' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials!' },
        { status: 401 }
      );
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials!' },
        { status: 401 }
      );
    }

    // Create JWT token and user session
    const token = await createSession({
      userGuid: user.guid,
      role: user.role,
    });

    // Send response with JWT token
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
