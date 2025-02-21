"use server";

import { prisma } from "@/utils/prisma";
import { auth } from "@/libs/auth";

export async function createEventAction(_, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const datetime = formData.get("datetime");
  const location = formData.get("location");
  const description = formData.get("description");

  const session = await auth();

  if (!session) {
    return {
      status: "error",
      message: "You must be logged in to create an event",
    };
  }

  if (!title || !datetime || !description) {
    return {
      status: "error",
      message: "All fields are required",
    };
  }

  const newEvent = await prisma.event.create({
    date: {
      title,
      date: new Date(datetime),
      description,
      location,
      image: image.size !== 0 ? image.name : "",
      authorId: session.user.id,
    },
  });

  return {
    status: "success",
    message: "Event created!",
  };

  console.log({ title, image, datetime, description });
}
