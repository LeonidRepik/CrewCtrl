import { useState, useEffect } from 'react';
import ReturnHeader from './ReturnHeader';
import { Input } from './index';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NewFlight({ onClickClose, isModal }) {
  // Checking the local storage on first render
  useEffect(() => {
    const storedFlight = JSON.parse(localStorage.getItem('newFlight'));
    if (storedFlight) {
      console.log('Stored Flight:', storedFlight);
    }
    // Clearing local storage on first render
    localStorage.removeItem('newFlight');
  }, []);

  const navigateTo = useNavigate();

  const flightDuration = {
    BOGToCLO: 0.6,
    BOGToMDE: 0.6,
    BOGToLET: 1.8,
    BOGToBGA: 0.8,
    BOGToCUC: 1.1,
    BOGToVUP: 1.2,
    BOGToCTG: 1,
    BOGToBAQ: 1.1,
    BOGToMTR: 0.8,
    BOGToADZ: 2,
    CLOToBOG: 0.5,
    CLOToMDE: 0.5,
    CLOToLET: 0.5,
    CLOToBGA: 1,
    CLOToCUC: 0.6,
    CLOToVUP: 1.1,
    CLOToCTG: 1.1,
    CLOToBAQ: 1.2,
    CLOToMTR: 1,
    CLOToADZ: 1.8,
    MDEToBOG: 0.5,
    MDEToCLO: 0.5,
    MDEToLET: 1.1,
    MDEToBGA: 0.5,
    MDEToCUC: 0.8,
    MDEToVUP: 1.3,
    MDEToCTG: 1,
    MDEToBAQ: 1.1,
    MDEToMTR: 0.8,
    MDEToADZ: 1.7,
    LETToBOG: 1.7,
    LETToCLO: 1.7,
    LETToMDE: 1.1,
    LETToBGA: 0.6,
    LETToCUC: 0.6,
    LETToVUP: 0.7,
    LETToCTG: 1.2,
    LETToBAQ: 1.3,
    LETToMTR: 1,
    LETToADZ: 1.8,
    BGAToBOG: 0.8,
    BGAToCLO: 0.9,
    BGAToMDE: 0.5,
    BGAToLET: 0.6,
    BGAToCUC: 0.9,
    BGAToVUP: 1,
    BGAToCTG: 0.8,
    BGAToBAQ: 1,
    BGAToMTR: 0.8,
    BGAToADZ: 1.8,
    CUCToBOG: 1,
    CUCToCLO: 1,
    CUCToMDE: 0.8,
    CUCToLET: 0.6,
    CUCToBGA: 1,
    CUCToVUP: 1.1,
    CUCToCTG: 0.8,
    CUCToBAQ: 0.9,
    CUCToMTR: 0.6,
    CUCToADZ: 1.5,
    VUPToBOG: 1.1,
    VUPToCLO: 1.1,
    VUPToMDE: 1.3,
    VUPToLET: 1.4,
    VUPToBGA: 1,
    VUPToCUC: 1.1,
    VUPToCTG: 0.9,
    VUPToBAQ: 0.8,
    VUPToMTR: 0.5,
    VUPToADZ: 1.4,
    CTGToBOG: 1,
    CTGToCLO: 1,
    CTGToMDE: 1,
    CTGToLET: 1.2,
    CTGToBGA: 0.9,
    CTGToCUC: 0.8,
    CTGToVUP: 0.9,
    CTGToBAQ: 0.9,
    CTGToMTR: 0.6,
    CTGToADZ: 1.5,
    BAQToBOG: 1,
    BAQToCLO: 1.2,
    BAQToMDE: 1.1,
    BAQToLET: 1.3,
    BAQToBGA: 1,
    BAQToCUC: 0.9,
    BAQToVUP: 0.8,
    BAQToCTG: 0.9,
    BAQToMTR: 0.7,
    BAQToADZ: 1.5,
    MTRToBOG: 1,
    MTRToCLO: 1,
    MTRToMDE: 0.8,
    MTRToLET: 1,
    MTRToBGA: 0.8,
    MTRToCUC: 0.6,
    MTRToVUP: 0.5,
    MTRToCTG: 0.6,
    MTRToBAQ: 0.7,
    MTRToADZ: 0.8,
    ADZToBOG: 2.3,
    ADZToCLO: 1.8,
    ADZToMDE: 1.7,
    ADZToLET: 1.8,
    ADZToBGA: 1.8,
    ADZToCUC: 1.5,
    ADZToVUP: 1.4,
    ADZToCTG: 1.5,
    ADZToBAQ: 1.5,
    ADZToMTR: 0.8,
  };

  const [flightInfo, setflightInfo] = useState({
    from: '',
    to: '',
    aircraftType: '',
    flightNumber: '',
    weather: 'BBQ weather',
    departure: '',
    arriving: '',
    specialRequirements: {
      lvp: false,
      pbn: false,
    },
    crewMembers: [
      {
        member1: '',
        member2: '',
        member3: '',
        cabinCrew: {
          cabin1: '',
          cabin2: '',
          cabin3: '',
          cabin4: '',
          cabin5: '',
          cabin6: '',
        },
      },
    ],
  });

  const [flightTimes, setflightTimes] = useState({
    dateOut: '',
    hourOut: '',
    dateIn: '',
    hourIn: '',
  });
  const [inputTypes, setInputTypes] = useState('text');
  const [hourTypes, setHourTypes] = useState('text');

  function handleFocus(isDate) {
    setInputTypes(isDate ? 'date' : 'text');
    setHourTypes(isDate ? 'text' : 'time');
  }

  const aircraftRegistrations = [
    { registration: 'CC-BLJ', type: 'Airbus A319' },
    { registration: 'CC-BLK', type: 'Airbus A319' },
    { registration: 'CC-BAG', type: 'Boeing 787-9 Dreamliner' },
    { registration: 'CC-COP', type: 'Boeing 787-9 Dreamliner' },
    { registration: 'CC-BFA', type: 'Boeing 787-9 Dreamliner' },
    { registration: 'CC-CQN', type: 'Airbus A320' },
    { registration: 'CC-BAS', type: 'Boeing 767-316(ER)' },
    { registration: 'CC-BLI', type: 'Airbus A321' },
    { registration: 'CC-BLH', type: 'Airbus A320' },
    { registration: 'CC-BAI', type: 'Boeing 787-9 Dreamliner' },
  ];
  const AirportList = [
    { iataCode: 'BOG', city: 'Bogota' },
    { iataCode: 'CLO', city: 'Cali' },
    { iataCode: 'MDE', city: 'Medellin' },
    { iataCode: 'LET', city: 'Leticia' },
    { iataCode: 'BGA', city: 'Bucaramanga' },
    { iataCode: 'CUC', city: 'Cucuta' },
    { iataCode: 'VUP', city: 'Valledupar' },
    { iataCode: 'CTG', city: 'Cartagena' },
    { iataCode: 'BAQ', city: 'Barranquilla' },
    { iataCode: 'MTR', city: 'Monteria' },
    { iataCode: 'ADZ', city: 'San Andres' },
  ];

  function handleBlur() {
    setInputTypes('text');
    setHourTypes('text');
  }

  useEffect(() => {
    if (
      flightInfo.from &&
      flightInfo.to &&
      flightTimes.dateOut &&
      flightTimes.hourOut
    ) {
      const dateHour = combineDateAndHour(
        flightTimes.dateOut,
        flightTimes.hourOut
      );
      setflightInfo((prevFlightInfo) => ({
        ...prevFlightInfo,
        departure: dateHour,
      }));

      const destination = addHoursToDateString(
        dateHour,
        flightDuration[`${flightInfo.from}To${flightInfo.to}`]
      );

      setflightInfo((prevFlightInfo) => ({
        ...prevFlightInfo,
        arriving: destination,
      }));

      // Extract date and time from arriving
      const arrivingDate = destination.slice(0, 10); // Extract date (yyyy-mm-dd)
      const arrivingTime = destination.slice(11, 16); // Extract time (hh:mm)

      // Set dateIn and hourIn
      setflightTimes((prevFlightTimes) => ({
        ...prevFlightTimes,
        dateIn: arrivingDate,
        hourIn: arrivingTime,
      }));
    }
    // console.log(flightInfo);
  }, [
    flightInfo.from,
    flightInfo.to,
    flightTimes.dateOut,
    flightTimes.hourOut,
  ]);

  function handleInput(event) {
    const { name, value } = event.target;
    setflightInfo((prevFlightInfo) => ({
      ...prevFlightInfo,
      [name]: value,
    }));
  }

  function handleCheckboxInput(event) {
    const { name, checked } = event.target;
    setflightInfo((prevFlightInfo) => ({
      ...prevFlightInfo,
      specialRequirements: {
        ...prevFlightInfo.specialRequirements,
        [name]: checked,
      },
    }));
  }

  function handleHoursInput(event) {
    const { name, value } = event.target;
    setflightTimes((prevFlightTimes) => ({
      ...prevFlightTimes,
      [name]: value,
    }));
  }
  function combineDateAndHour(date, hour) {
    const combinedDateTime = `${date}T${hour}`;
    return combinedDateTime;
  }
  function addHoursToDateString(dateString, hoursToAdd) {
    var date = new Date(dateString);
    var totalMillisecondsToAdd = (hoursToAdd - 7) * 60 * 60 * 1000;
    date.setTime(date.getTime() + totalMillisecondsToAdd - 12);
    var newDateString = date.toISOString().slice(0, 16);
    return newDateString;
  }

  function handleSubmit(event) {
    console.log('Haha');
    event.preventDefault();

    const dateString = `${flightTimes.dateIn} ${flightTimes.hourIn}`;

    // Convert the original string to a Date object
    var originalDate = new Date(dateString.replace(/-/g, '/'));

    // Format the date in the desired format
    var convertedDateString = originalDate.toISOString().replace('Z', '+00:00');

    fetch('/api/v1/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...flightInfo, expireAt: convertedDateString }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.user._id);
        localStorage.setItem(
          'newFlight',
          JSON.stringify({
            ...flightInfo,
            _id: data.data.user._id,
            expireAt: convertedDateString,
          })
        );
        if (isModal) {
          onClickClose(false, true, true);
        } else {
          navigateTo('/add-crew');
        }
      })
      .catch((error) => console.error('Error occurred:', error));

    // localStorage.setItem('newFlight', JSON.stringify(flightInfo));
    // console.log(localStorage.getItem('newFlight'));
    // if (isModal) {
    //   onClickClose(false, true, true);
    // } else {
    //   navigateTo('/add-crew');
    // }
  }

  return (
    <>
      <ReturnHeader
        destinationPage="/dashboard/create-flight"
        onClick={onClickClose}
      >
        Create Flight
      </ReturnHeader>
      <form onSubmit={handleSubmit} className="form__element">
        <div className="form_container">
          <div className="select__input">
            <p>Select Route:</p>
            <div className="route_selection">
              <div className="label_container">
                <label>
                  <p>From</p>
                  <select
                    name="from"
                    value={flightInfo.from}
                    onChange={handleInput}
                    required
                  >
                    <option value="" disabled aria-placeholder="Select Origin">
                      Select Origin
                    </option>
                    {AirportList.map((airport, index) => (
                      <option key={index} value={airport.iataCode}>
                        {airport.iataCode} - {airport.city}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="label_container">
                <label>
                  <p>To</p>
                  <select
                    name="to"
                    value={flightInfo.to}
                    onChange={handleInput}
                    required
                  >
                    <option
                      value=""
                      disabled
                      aria-placeholder="Select Destination"
                    >
                      Select Destination
                    </option>
                    {AirportList.map((airport, index) => (
                      <option key={index} value={airport.iataCode}>
                        {airport.iataCode} - {airport.city}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className="departure_info">
            <div className="input__section">
              <label> Departure information </label>
              <div className="input__group">
                <div className="input__field">
                  <label htmlFor="dateOut">
                    {' '}
                    <p>Date</p>{' '}
                  </label>
                  <Input
                    placeholder="Select Date"
                    type={inputTypes}
                    name="dateOut"
                    onFocus={() => handleFocus(true)}
                    onBlur={handleBlur}
                    value={flightTimes.dateOut}
                    onChange={handleHoursInput}
                    id="dateOut"
                    required
                  ></Input>
                </div>
                <div className="input__field">
                  <label htmlFor="hourOut">
                    <p>Time</p>
                  </label>
                  <Input
                    placeholder="Select Time"
                    type={hourTypes}
                    name="hourOut"
                    onFocus={() => handleFocus(false)}
                    onBlur={handleBlur}
                    value={flightTimes.hourOut}
                    onChange={handleHoursInput}
                    id="hourOut"
                    required
                  ></Input>
                </div>
              </div>
            </div>
            <div className="input__section">
              <label> Arrival information </label>
              <div className="input__group">
                <div className="input__field">
                  <label htmlFor="dateIn">
                    {' '}
                    <p>Date</p>{' '}
                  </label>
                  <Input
                    type="date"
                    name="dateIn"
                    value={flightTimes.dateIn}
                    onChange={handleHoursInput}
                    id="dateIn"
                    disabled
                  />
                </div>
                <div className="input__field">
                  <label htmlFor="hourIn">
                    <p>Time</p>
                  </label>
                  <Input
                    type="time"
                    name="hourIn"
                    value={flightTimes.hourIn}
                    onChange={handleHoursInput}
                    id="hourIn"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <label className="section-title">General Information</label>
            <div className="section-content">
              <Input
                type="text"
                name="flightNumber"
                value={flightInfo.flightNumber}
                onChange={handleInput}
                required
                placeholder="LA-2368"
                className="input__section_flight"
              >
                Flight Number:
              </Input>
              <label>
                Aircraft Type
                <div className="aircraft__select">
                  <select
                    className="aircraft-type"
                    name="aircraftType"
                    value={flightInfo.aircraftType}
                    onChange={handleInput}
                    required
                  >
                    <option value="" disabled aria-placeholder="true">
                      Select Aircraft Type
                    </option>
                    {aircraftRegistrations.map((aircraft, index) => (
                      <option key={index} value={aircraft.registration}>
                        {aircraft.type} - {aircraft.registration}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <div className="section-subsection">
                <div>
                  <label className="subsection-title">Flight Restriction</label>
                  <div className="subsection-content">
                    <Input
                      type="checkbox"
                      name="lvp"
                      className="restriction-checkbox"
                      onChange={handleCheckboxInput}
                    >
                      LVP
                    </Input>
                    <Input
                      type="checkbox"
                      name="pbn"
                      className="restriction-checkbox"
                      onChange={handleCheckboxInput}
                    >
                      PBN
                    </Input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            isModal ? 'buttonContainerForm is-modal' : 'buttonContainerForm'
          }
        >
          {/* <button
            type="submit"
            disabled={
              (flightInfo.from === '' ||
                flightInfo.to === '' ||
                flightInfo.aircraftType === '' ||
                flightInfo.flightNumber === '' ||
                flightInfo.weather === '' ||
                flightInfo.departure === '' ||
                flightInfo.arriving === '') &&
              ''
            }
            className={
              (flightInfo.from === '' ||
                flightInfo.to === '' ||
                flightInfo.aircraftType === '' ||
                flightInfo.flightNumber === '' ||
                flightInfo.weather === '' ||
                flightInfo.departure === '' ||
                flightInfo.arriving === '') &&
              'disabledClass'
            }
          >
            Continue to Crew
          </button> */}

          <button
            type="submit"
            disabled={
              flightInfo.from === '' ||
              flightInfo.to === '' ||
              flightInfo.aircraftType === '' ||
              flightInfo.flightNumber === '' ||
              flightInfo.weather === '' ||
              flightInfo.departure === '' ||
              flightInfo.arriving === ''
            }
            className={
              flightInfo.from === '' ||
              flightInfo.to === '' ||
              flightInfo.aircraftType === '' ||
              flightInfo.flightNumber === '' ||
              flightInfo.weather === '' ||
              flightInfo.departure === '' ||
              flightInfo.arriving === ''
                ? 'disabledClass'
                : ''
            }
          >
            Continue to Crew
          </button>
        </div>
      </form>
    </>
  );
}

NewFlight.propTypes = {
  onClickClose: PropTypes.func,
  isModal: PropTypes.bool,
};
