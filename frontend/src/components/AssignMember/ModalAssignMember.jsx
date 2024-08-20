import AssignMember from '../AssignMember/AssignMember';
import { ReturnHeader } from '../../components';
import { useRef } from 'react';
export default function ModalAssignMember({ id, onClickClose }) {
  const assignMemberRef = useRef(null);
  return (
    <>
      <ReturnHeader destinationPage={'/dashboard/main'} onClick={onClickClose}>
        Add Crew Member
      </ReturnHeader>
      <div assignMemberRef={assignMemberRef}>
        <AssignMember />
      </div>
    </>
  );
}
