'use server';

import { prisma } from '@/utils/prisma';
import bcrypt from 'bcryptjs'; // karena kalau pake bcrypt error node_modules

export async function registerAction(_, formData) {
  const name = formData.get('fullname');
  const email = formData.get('email');
  const password = formData.get('password');
  const rePassword = formData.get('rePassword');

  if ((!name, !email || !password || !rePassword)) {
    return {
      status: 'error',
      message: 'All fields are required',
    };
  }

  if (password !== rePassword) {
    return {
      status: 'error',
      message: 'Password do not match',
    };
  }

  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail) {
    return {
      status: 'error',
      message: 'User already registered',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return {
    status: 'success',
    message: 'user registered sucessfully',
  };
}
