import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CrewMemberCallbtn from './CrewMemberCallbtn';
import CrewMemberMessageBtn from './CrewMemberMessageBtn';
import CrewMemberAssignBtn from './CrewMemberAssignBtn';
import avatarPlaceHolders from '../../assets/images/avatarPlaceHolder.jpg';
import '../../../SASS/components/_crewMemberInfo.scss';

function CrewMemberInfo({ crewId, onAssignClick }) {
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(crewId);

  useEffect(function () {
    async function fetchCrew() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/v1/crew/${id}`);
        let data = await res.json();
        const profile = await data.data.CrewMember;
        profile.flightHours.available =
          profile.flightHours.available === 'available' ? 'active' : 'inactive';
        setProfile(profile);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCrew();
  }, []);

  let joinDate = 'March 2023';

  return (
    <div className="crewInfo">
      {profile ? (
        <div className="crewInfo__container">
          <div className="crewInfo__infoUp">
            <div className="crewInfo__avatar">
              <img
                src={avatarPlaceHolders}
                alt="Profile Avatar Vectors by Vecteezy"
              ></img>
            </div>

            <div className="crewInfo__nameStatus">
              <div className="crewInfo__nameStatus__container">
                <p>{profile.name}</p>
                <div className="crewInfo__status">
                  <p>{profile.flightHours.available}</p>
                </div>
              </div>

              <div className="crewInfo__roleDate">
                <p className="crewInfo__roleDate__role">{profile.role}</p>
                <p className="crewInfo__roleDate__date">{joinDate}</p>
              </div>
            </div>
          </div>
          <div className="crewInfo__infoMid">
            <div className="crewInfo__infoMid__left">
              <p className="crewInfo__infoMid__left__currentHour">
                <span className="currentHour">
                  {profile.flightHours.thisMonth}
                </span>
                <span className="divider">
                  {'/'}
                  {'90'}
                </span>
              </p>
              <p className="crewInfo__infoMid__left__title">Flight Time</p>
            </div>
            <div className="crewInfo__infoMid__mid">
              <p className="crewInfo__infoMid__mid__flights">{'3 flights'}</p>
              <p className="crewInfo__infoMid__left__title">Per Week</p>
            </div>
            <div className="crewInfo__infoMid__right">
              <p className="crewInfo__infoMid__right__pto">{'40 days'}</p>
              <p className="crewInfo__infoMid__left__title">PTO</p>
            </div>
          </div>
          <div className="crewInfo__infolow">
            <div className="crewInfo__infolow__left">
              <CrewMemberCallbtn />
              <p className="crewInfo__infolow__title">Call</p>
            </div>
            <div className="crewInfo__infolow__mid">
              <CrewMemberMessageBtn />
              <p className="crewInfo__infolow__title">Message</p>
            </div>
            <div className="crewInfo__infolow__right">
              <CrewMemberAssignBtn />
              <button onClick={onAssignClick} className="crewInfo__infolow__btn">
                <span className="crewInfo__infolow__title">
                  Assign
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CrewMemberInfo;
