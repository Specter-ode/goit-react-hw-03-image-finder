import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ title, onClickBtn }) {
  return (
    <button type="button" onClick={onClickBtn} className={s.button}>
      {title}
    </button>
  );
}

Button.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
};
