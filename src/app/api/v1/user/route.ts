// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { prisma } from '@/prisma/prisma';

export async function GET(request) {
  // Do whatever you want
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
