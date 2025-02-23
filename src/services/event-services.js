import { prisma } from '@/utils/prisma';

export async function getAllEvents() {
  try {
    const events = await prisma.event.findMany();
    return events;
  } catch (error) {
    console.log(`Error getting events: ${error}`);
    return [];
  }
}

export async function getEventById(id) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        participants: true,
      },
    });

    if (!event) {
      return null;
    }

    const participantCount = event.participants.length;

    return {
      ...event,
      participantCount,
    };
  } catch (error) {
    console.log(`Error getting detail event: ${error}`);
    return null;
  }
}

export async function joinEvent(name, email, eventId) {
  try {
    const participant = await prisma.participant.create({
      data: {
        name,
        email,
        eventId,
      },
    });
    return participant;
  } catch (error) {
    console.log(`Error joining event: ${error}`);
    return null;
  }
}

export async function isEmailRegisteredForEvent(email, eventId) {
  try {
    const participant = await prisma.participant.findFirst({
      where: {
        email: email,
        eventId: eventId,
      },
    });

    // If participant exists, the email is already registered for the event
    return !!participant;
  } catch (error) {
    console.error('Error checking email registration:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
