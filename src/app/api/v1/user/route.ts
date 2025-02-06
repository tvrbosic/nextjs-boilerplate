// LIBRARY
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// APP
import { prisma } from '@/prisma/prisma';

export async function GET(req: Request) {
  // Do whatever you want
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany();
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, role, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email and createdById are required.' },
        { status: 400 }
      );
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

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
