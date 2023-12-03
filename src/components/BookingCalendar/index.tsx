import React from 'react';
import Calendar, { TileClassNameFunc, TileContentFunc } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Booking } from '../../types';

interface BookingCalendarProps {
  bookings: Booking[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings }) => {
  const getUnavailableDates = () => {
    const dateSet: Set<string> = new Set();

    bookings.forEach((booking: Booking) => {
      const startDate = new Date(booking.dateFrom);
      const endDate = new Date(booking.dateTo);

      let currentDate = startDate;
      while (currentDate <= endDate) {
        const formattedDate = formatDate(currentDate);
        dateSet.add(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return dateSet;
  };

  const getTileClassName: TileClassNameFunc = ({ date }) => {
    const dateString = formatDate(date);
    const bookedDates = Array.from(getUnavailableDates());
    const isBooked = bookedDates.some((bookedDate) => bookedDate === dateString);

    return isBooked ? 'booked with-gap' : 'available';
  };

  const tileContent = ({ date }: { date: Date }) => {
    const dateString = formatDate(date);
    const bookedDates = Array.from(getUnavailableDates());
    const isBooked = bookedDates.some((bookedDate) => bookedDate === dateString);

    return isBooked ? (
      <div className='custom-tile-content'>
        <span className='booked-indicator' />
        <span>Booked</span>
      </div>
    ) : null;
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  return (
    <div className='calendar'>
      <h2>Availability Calendar</h2>
      <Calendar
        className='text-black'
        tileClassName={getTileClassName}
        tileContent={tileContent as TileContentFunc}
      />
    </div>
  );
};

export default BookingCalendar;
