import { PinIcon } from "lucide-react";
import React from "react";

export default function Page({ params }) {
    const {id} = await params

    const event = await prisma.event.findUnique({
        where: {
            id,
        },
    });

    if(!event) {
return <div>Event not found!</div>
    }

    return (
      <main className="grid grid-cols-8 gap-8">
        <div className="col-span-3">
          <div className="w-full h-72 bg-slate-300 rounded-lg"></div>
        </div>
        <div className="col-span-5 space-y-6">
          <h1 className="text-5xl">{event.title}</h1>
          <section className="flex gap-4 items-center">
            <div className="border rounder-lg divide-y-1 overflow-hidden">
              <div className="px-3 py-0.5 text-center text-sm font-semibold bg-slate-100">
                {moment(event.date).format("MMM")}
              </div>
              <div className="px-3 py-1 font-semibold text-center">
                {moment(event.date).format("DD")}
              </div>
              <div>
                <p>Wednesday, February 19</p>
                <p>08.00 PM - 10.00 PM</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
}