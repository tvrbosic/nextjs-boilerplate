// LIBRARY
import { NextResponse } from 'next/server';

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
    const { email, firstName, lastName, role, createdById, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email and createdById are required.' },
        { status: 400 }
      );
    }

    // TODO: Read logged in user from http context !!!!
    // const createdByUser = await prisma.user.findUnique({
    //   where: { guid: createdById },
    // });

    // if (!createdByUser) {
    //   return NextResponse.json(
    //     { error: "Invalid createdById. User not found." },
    //     { status: 404 }
    //   );
    // }

    // TODO: hash password

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        role: role || 'USER',
        createdBy: { connect: { guid: createdById } },
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
