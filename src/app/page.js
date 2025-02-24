import React from 'react';
import { CategoryCard } from './_components/category-card';
import { SectionEvents } from './_components/section-events';
import { SectionEventsSkeleton } from './_components/section-events-skeleton';
import { getAllEvents } from '@/services/event-services';

export default async function Page() {
  const events = await getAllEvents();
  return (
    <div className="flex flex-col items-center space-y-6">
      <section className="text-center text-balance space-y-2">
        <h1 className="text-4xl">Explore Events</h1>
        <p className="text-lg">
          Explore popular events near you, browse by category, or check out some
          of the great community calendars.
        </p>
      </section>
      <React.Suspense fallback={<SectionEventsSkeleton />}>
        <SectionEvents events={events} />
      </React.Suspense>
    </div>
  );
}
