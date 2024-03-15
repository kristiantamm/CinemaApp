import './ChooseSeats.css';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';

export default function ChooseSeats() {
  const { id } = useParams();
  const [screenings, setScreenings] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketCount, setTicketCount] = useState(1); // State for ticket count

  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/screenings/${id}`)
      .then(response => {
        setScreenings(response.data);
        setSelectedScreening(response.data[0]);
      })
      .catch(error => console.error('Error fetching screenings:', error));
  }, [id]);

  function handleScreeningChange(screening) {
    setSelectedSeats([]);
    setSelectedScreening(screening);
  }

  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  }

  function selectSeatsInMiddle(screening, seatCount) {
    const availableSeats = Array.from({ length: 8 * 8 }, (_, i) => i).filter(
      seat => !screening.occupied.includes(seat)
    );

    const selected = [];
    const middleIndex = Math.floor(availableSeats.length / 2);
    const startIndex = seatCount % 2 === 0 ? middleIndex + 1 : middleIndex;

    for (let i = startIndex; i >= 0 && selected.length < seatCount; i--) {
      selected.push(availableSeats[i]);
    }

    for (let i = startIndex + 1; i < availableSeats.length && selected.length < seatCount; i++) {
      selected.push(availableSeats[i]);
    }

    setSelectedSeats(selected);
  }

  return (
    <div className="ChooseSeats">
      <Screenings screenings={screenings} onChange={handleScreeningChange} />
      <ShowCase />
      {selectedScreening && (
        <>
          <div>
            <label htmlFor="ticketCount">Number of Tickets:</label>
            <input
              type="number"
              id="ticketCount"
              value={ticketCount}
              min="1"
              onChange={e => setTicketCount(parseInt(e.target.value))}
            />
            <button onClick={() => selectSeatsInMiddle(selectedScreening, ticketCount)}>Select Seats</button>
          </div>
          <Cinema
            screening={selectedScreening}
            selectedSeats={selectedSeats}
            onSelectedSeatsChange={handleSelectedState}
          />
        </>
      )}
      <p className="info">
        You have selected <span className="count">{selectedSeats.length}</span>{' '}
        seats for the price of{' '}
        <span className="total">
          {selectedSeats.length * (selectedScreening ? selectedScreening.ticket_price : 0)}€
        </span>
      </p>
    </div>
  );
}

function Screenings({ screenings, onChange }) {
  return (
    <div className="Movies">
      <label htmlFor="movie">Pick a screening</label>
      <select
        id="movie"
        onChange={e => {
          const selectedScreening = screenings.find(screening => screening.screening_time === e.target.value);
          onChange(selectedScreening);
        }}
      >
        {screenings.map(screening => (
          <option key={screening.screening_time} value={screening.screening_time}>
            {screening.screening_time} ({screening.ticket_price}€)
          </option>
        ))}
      </select>
    </div>
  );
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>N/A</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  );
}

function Cinema({ screening, selectedSeats, onSelectedSeatsChange }) {
  const seats = Array.from({ length: 8 * 8 }, (_, i) => i);
  
  function isSeatOccupied(seat) {
    return screening.occupied.includes(seat);
  }

  return (
    <div className="Cinema">
      <div className="screen" />
      <div className="seats">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = isSeatOccupied(seat);
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx('seat', isSelected && 'selected', isOccupied && 'occupied')}
              onClick={isOccupied ? null : () => onSelectedSeatsChange(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : e => {
                      if (e.key === 'Enter') {
                        onSelectedSeatsChange(seat);
                      }
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}