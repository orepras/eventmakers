import React from "react";
import moment from "moment";
import Link from "next/link";

export const EventCard = ({ title, datetime, location }) => {
  return (
    <div className="flex gap-3">
      <div className="w-20 h-24 bg-indigo-100 rounded-lg" />
      <div className="space-y-1">
        <Link href={`/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{moment(datetime).format("DD MM YYYY - hh:mm a")}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};
