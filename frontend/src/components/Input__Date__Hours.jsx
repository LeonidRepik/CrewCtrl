import React from 'react';
import PropTypes from 'prop-types';

import Input from './index';

const Input__Date__Hours = React.memo(function InputDateHours({ inputTypes, handleBlur, flightTimes, handleHoursInput, handleFocus, hourTypes }) {
  return (
    <div className="input__section">
      <label> Departure information </label>
      <div className="input__group">
        <div className="input__field">
          <label htmlFor="dateOut"> Date </label>
          <Input
            placeholder="Select Date"
            type={inputTypes}
            name="dateOut"
            onFocus={() => handleFocus(true)}
            onBlur={handleBlur}
            value={flightTimes.dateOut}
            onChange={handleHoursInput}
            required
          ></Input>
        </div>
        <div className="input__field">
          <label htmlFor="hourOut">Time</label>
          <Input
            placeholder="Select Time"
            type={hourTypes}
            name="hourOut"
            onFocus={() => handleFocus(false)}
            onBlur={handleBlur}
            value={flightTimes.hourOut}
            onChange={handleHoursInput}
            required
          ></Input>
        </div>
      </div>
    </div>
  );
});

Input__Date__Hours.displayName = 'Input__Date__Hours';

Input__Date__Hours.propTypes = {
  inputTypes: PropTypes.string,
  handleBlur: PropTypes.func,
  flightTimes: PropTypes.object,
  handleHoursInput: PropTypes.func,
  handleFocus: PropTypes.func,
  hourTypes: PropTypes.string,
};

export default Input__Date__Hours;
