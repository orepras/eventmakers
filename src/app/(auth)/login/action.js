'use server';

import { prisma } from '@/utils/prisma';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs'; // karena kalau pake bcrypt error node_modules

export async function loginAction(_, formData) {
  const cookieStore = await cookies();

  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      status: 'error',
      message: 'All fields are required',
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      status: 'error',
      message: 'User not found',
    };
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return {
      status: 'error',
      message: 'Password is invalid !',
    };
  }

  //create new Session
  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  cookieStore.set('sessionId', newSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: true,
  });

  redirect('/');
}
