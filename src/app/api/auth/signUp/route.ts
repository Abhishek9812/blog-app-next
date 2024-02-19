// pages/api/auth/signUp.ts

import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'
import { hashPassword } from '@/utils/util';

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 403 });
  }

  try {
    const { username, email, password } = await req.json();
    console.log({ username, email, password });
    // Check if a user with the same username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser: any = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}