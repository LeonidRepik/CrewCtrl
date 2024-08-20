import  NewFlight  from './NewFlight';
import PropTypes from 'prop-types';

export default function ModalNewFlight({ onClickClose }) {
    return (
        <>
            <NewFlight onClickClose={onClickClose} isModal={true}/>
        </>
    )
}

ModalNewFlight.propTypes = {
    onClickClose: PropTypes.func,
};