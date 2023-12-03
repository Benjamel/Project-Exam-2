import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import createBooking from '../../services/bookings/create';
import { Booking } from '../../types';
import CustomModal from '../ChangeAvatarModal';

interface BookingFormProps {
  venueId?: string;
  accessToken: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onBookingSubmit: (newBooking: Booking) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  venueId,
  accessToken,
  isOpen,
  onRequestClose,
  onBookingSubmit,
}) => {
  const [bookingData, setBookingData] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
    guests: 1,
  });

  const handleDateChange = (date: Date, fieldName: string) => {
    setBookingData((prevData) => ({ ...prevData, [fieldName]: date }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'guests' ? parseInt(value, 10) : value;

    setBookingData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!venueId) {
        console.error('venueId is undefined');
        return;
      }

      const newBooking: Booking = await createBooking({
        ...bookingData,
        venueId,
        accessToken,
      });

      onRequestClose();
      onBookingSubmit(newBooking);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <form className='p-5' onSubmit={handleBookingSubmit}>
        <div className='mt-2'>
          <label>
            Date From:
            <DatePicker
              selected={bookingData.dateFrom}
              onChange={(date) => handleDateChange(date as Date, 'dateFrom')}
              dateFormat='MMMM d, yyyy'
            />
          </label>
        </div>
        <br />
        <div className='mt-2'>
          <label>
            Date To:
            <DatePicker
              selected={bookingData.dateTo}
              onChange={(date) => handleDateChange(date as Date, 'dateTo')}
              dateFormat='MMMM d, yyyy'
            />
          </label>
        </div>
        <br />
        <div className='mt-2'>
          <label>
            Guests:
            <select name='guests' value={bookingData.guests} onChange={handleInputChange}>
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <button type='submit'>Book Now</button>
      </form>
    </CustomModal>
  );
};

export default BookingForm;
