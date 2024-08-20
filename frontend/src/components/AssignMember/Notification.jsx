import CheckMark from './CheckMark';
import '../../../SASS/components/_Notification.scss';
function Notification() {
  return (
    <>
      <div className="checkMark">
        <CheckMark />
        <p className="checkMark__title)">Crew has been notified</p>
      </div>
    </>
  );
}

export default Notification;
