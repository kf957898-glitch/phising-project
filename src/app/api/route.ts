import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  return NextResponse.json({ message: 'Hello world' });
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
