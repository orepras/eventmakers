import { CategoryCard } from "./_components/category-card";
import { EventCard } from "./_components/event-card";

export default function Page() {
  return (
    <>
      <section className="text-center text-balance space-y-2">
        <h1 className="text-4xl">Discover Events</h1>
        <p className="text-lg">
          Explore popular events near you, browse by category, or check out some
          of the great community calendars.
        </p>
      </section>
      <section className="space-y-4">
        <h1>Popular Events</h1>
        <div className="grid grid-cols-2 gap-8">
          <EventCard
            title="Placeholder of the Event Title"
            dateTime="Feb 20th, 2025 - 20.00 WIB"
            location="Jakarta, Indonesia"
          />
          <EventCard
            title="Placeholder of the Event Title"
            dateTime="Feb 20th, 2025 - 20.00 WIB"
            location="Jakarta, Indonesia"
          />
          <EventCard
            title="Placeholder of the Event Title"
            dateTime="Feb 20th, 2025 - 20.00 WIB"
            location="Jakarta, Indonesia"
          />
          <EventCard
            title="Placeholder of the Event Title"
            dateTime="Feb 20th, 2025 - 20.00 WIB"
            location="Jakarta, Indonesia"
          />
          <EventCard
            title="Placeholder of the Event Title"
            dateTime="Feb 20th, 2025 - 20.00 WIB"
            location="Jakarta, Indonesia"
          />{" "}
          <EventCard
            title="Placeholder of the Event Title"
            dateTime="Feb 20th, 2025 - 20.00 WIB"
            location="Jakarta, Indonesia"
          />
        </div>
      </section>
      <section className="space-y-4">
        <h1>Explore By Categories</h1>
        <div className="grid grid-col-3 gap-4">
          <CategoryCard category="Webinar" totalEvents={10} />
          <CategoryCard category="Health and Care" totalEvents={10} />
          <CategoryCard category="Sports" totalEvents={10} />
          <CategoryCard category="Business" totalEvents={10} />
          <CategoryCard category="Music" totalEvents={10} />
          <CategoryCard category="Art" totalEvents={10} />
        </div>
      </section>
    </>
  );
}
