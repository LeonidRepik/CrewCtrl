import PropTypes from 'prop-types';
import CrewMemberInfo from '../components/CrewMemberInfo/CrewMemberInfo';
import CrewMemberLatestFlight from '../components/CrewMemberInfo/CrewMemberLatestFlight';
import CrewMemberAssignflightTable from '../components/CrewMemberInfo/CrewMemberAssignflightTable';
import { ReturnHeader } from '../components';
import { useState } from 'react';
import DoubleCheck from '../components/AssignMember/DoubleCheck';

export default function ModalCrewInfo({ id, onClickClose }) {
  const [showAssignTable, setShowAssignTable] = useState(false);
  return (
    <>
      <ReturnHeader
        destinationPage={'/dashboard/availability'}
        onClick={onClickClose}
      >
        Crew Member Information
      </ReturnHeader>
      {/* <CrewMemberInfo
        crewId={id}
        onAssignClick={() => setShowAssignTable(true)}
      />
      <CrewMemberLatestFlight expand={false} />
      <CrewMemberAssignflightTable /> */}
      {!showAssignTable && (
        <CrewMemberInfo
          crewId={id}
          onAssignClick={() => setShowAssignTable(true)}
        />
      )}
      {!showAssignTable && <CrewMemberLatestFlight expand={false} ticket={true} />}
      {showAssignTable && (
        <CrewMemberAssignflightTable expand={true} crewId={id} />
      )}
    </>
  );
}

ModalCrewInfo.propTypes = {
  id: PropTypes.string,
  onClickClose: PropTypes.func,
};
