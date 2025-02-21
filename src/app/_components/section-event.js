import React from "react";
import { EventCard } from "./event-card";
import { prisma } from "@/utils/prisma";

export const SectionEvents = async () => {
  const events = await prisma.event.findMany();

  return (
    <section className="space-y-4">
      <h1>Popular Events</h1>
      <div className="grid grid-cols-2 gap-8">
        {events.map((event) => {
          return (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              datetime={event.date.toString()}
              location={event.location}
            />
          );
        })}
      </div>
    </section>
  );
};
