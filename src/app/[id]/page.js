import { FaMapPin } from 'react-icons/fa6';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineDescription } from 'react-icons/md';
import { IoPersonCircleOutline } from 'react-icons/io5';
import moment from 'moment';
import Image from 'next/image';
import {
  getEventById,
  isEmailRegisteredForEvent,
} from '@/services/event-services';
import { auth } from '@/libs/auth';
import { prisma } from '@/utils/prisma';
import { revalidatePath } from 'next/cache';

export default async function Page({ params }) {
  const { id } = await params;
  const session = await auth();
  const event = await getEventById(id);
  const isRegistered = await isEmailRegisteredForEvent(session.user.email, id);

  async function joinEvent() {
    'use server';
    try {
      const participant = await prisma.participant.create({
        data: {
          name: session.user.name,
          email: session.user.email,
          eventId: id,
        },
      });
      revalidatePath('/');
    } catch (error) {
      console.log(`Error joining event: ${error}`);
      return null;
    }
  }

  return (
    <div className="grid grid-cols-8 gap-8">
      <div className="col-span-3">
        {event.image ? (
          <Image
            alt={event.title}
            src={`${process.env.R2_DEV_URL}/${id}/${event.image}`}
            width={400}
            height={400}
            className="rounded-lg"
          />
        ) : (
          <Image
            alt="Image not found"
            src="/image-template.png"
            width={400}
            height={400}
            className="rounded-lg"
          />
        )}
      </div>
      <div className="col-span-5 space-y-6">
        <h1 className="text-5xl">{event.title}</h1>
        <section className="flex gap-4 items-center">
          <div className="border rounded-lg divide-y-1 overflow-hidden">
            <div className="px-3 py-0.5 text-center text-sm font-semibold bg-slate-100">
              {moment(event.date).format('MMM')}
            </div>
            <div className="px-3 py-1 text-lg font-semibold text-center">
              {moment(event.date).format('DD')}
            </div>
          </div>
          <div>
            <p>{moment(event.date).format('ddd, MMM YYYY')}</p>
            <p>{moment(event.date).format('hh:mm a')}</p>
          </div>
        </section>
        <section className="flex gap-4 items-center">
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-slate-100">
            <FaMapPin size={16} />
          </div>
          <div>
            <p>{event.location}</p>
            <p>Indonesia</p>
          </div>
        </section>
        <section className="flex gap-4 items-center">
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-slate-100">
            <MdOutlineDescription size={16} />
          </div>
          <div>
            <p>Event Description</p>
            <p>{event.description}</p>
          </div>
        </section>
        <section className="flex gap-4 items-center">
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-slate-100">
            <IoPersonCircleOutline size={16} />
          </div>
          <div>
            <p>Participant Registered</p>
            <p>{event.participantCount}</p>
          </div>
        </section>
        <section className="flex gap-4 items-center">
          <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-slate-100">
            <BiCategory size={16} />
          </div>
          <div>
            <p>Event Category</p>
            <p>{event.category}</p>
          </div>
        </section>
        {!session ? (
          <p></p>
        ) : (
          <div className="space-y-4">
            <form action={joinEvent}>
              <button
                disabled={isRegistered}
                type="submit"
                className={`w-full ${
                  isRegistered
                    ? 'bg-gray-400 text-slate-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }  py-2 rounded-md`}
              >
                Join Event
              </button>
            </form>
            {isRegistered && (
              <div className="text-center text-emerald-600 bg-emerald-50 p-3 rounded-lg text-sm">
                You already joined this event!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
