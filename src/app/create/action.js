'use server';

import { prisma } from '@/utils/prisma';
import { auth } from '@/libs/auth';
import { uploadFile } from '@/libs/file-ops';

export async function createEventAction(_, formData) {
  const title = formData.get('title');
  const image = formData.get('image');
  const location = formData.get('location');
  const published = formData.get('published') == false;
  const description = formData.get('description');
  const datetime = formData.get('datetime');
  const category = formData.get('category');

  const session = await auth();

  if (!session) {
    return {
      status: 'error',
      message: 'You must be logged in to create an event',
    };
  }

  if (!title || !description || !datetime || !category || !location) {
    return { status: 'error', message: 'Please fill all fields' };
  }

  const newEvent = await prisma.event.create({
    data: {
      title,
      isPubslished: published,
      description,
      category,
      location,
      date: new Date(datetime),
      image: image.size !== 0 ? image.name : '',
      authorId: session.user.id,
    },
  });

  if (image.size !== 0) {
    await uploadFile({ key: image.name, folder: newEvent.id, body: image });
  }
  // devscale-batch8/asdfsa0idjf0oi232r/file.png

  console.log(image);

  return {
    status: 'success',
    message: 'Event created!',
  };
}
