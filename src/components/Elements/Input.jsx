import PropTypes from 'prop-types';

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input type={type} placeholder={placeholder} className="input input-bordered w-full" value={value} onChange={onChange} />
  )
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Input;
