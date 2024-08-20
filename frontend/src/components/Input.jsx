import PropTypes from 'prop-types';

export default function Input({ children, type, name, value, ...props}) {
    return (<label>
              {children}
              <input
                type={type}
                name={name}
                value={value}
                {...props}
              />
            </label>)
}

Input.propTypes = {
    children: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string
};