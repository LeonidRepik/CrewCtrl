import SelectCrew from "./SelectCrew";
import PropTypes from 'prop-types';

export default function ModalSelectCrew({ onClickClose }) {
  return <>
    <SelectCrew isModal={true} onClickClose={onClickClose}/>
  </>;
}

ModalSelectCrew.propTypes = {
  onClickClose: PropTypes.func,
};