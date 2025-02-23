'use server';
import { auth } from '@/libs/auth';
import { prisma } from '@/utils/prisma';

export async function joinEventAction(_, formData) {
  const id = formData.get('id');
  const session = await auth();

  const participant = await prisma.participant.create({
    data: {
      name: session.user.name,
      email: session.user.email,
      eventId: id,
    },
  });

  if (!session) {
    return {
      status: 'error',
      message: 'Must be login to join event!',
    };
  }

  if (!participant) {
    return {
      status: 'error',
      message: 'Failed to join event!',
    };
  }

  return {
    status: 'success',
    message: 'Successfully joined event!',
  };
}
