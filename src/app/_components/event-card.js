import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

export const EventCard = ({ id, title, datetime, location, image }) => {
  return (
    <div className="flex gap-3">
      <div className="w-20 h-24">
        {image ? (
          <Image
            alt={title}
            src={`${process.env.R2_DEV_URL}/${id}/${image}`}
            width={400}
            height={400}
            className="rounded-lg"
          />
        ) : (
          <Image
            alt={title}
            src="/image-template.png"
            width={400}
            height={400}
            className="rounded-lg"
          />
        )}
      </div>
      <div className="space-y-1">
        <Link href={`/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{moment(datetime).format('DD MMMM YYYY - hh:mm a')}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};
