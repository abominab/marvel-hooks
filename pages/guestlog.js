import { logInitProps } from "../utils/log";

const Log = ({ initProps }) => {
  return (
    <div>
      <h1 className="marvel-text">Guest Log</h1>
      {/* prettier-ignore */}
      <p>
        This page is meant to be a from that will allow users to leave messages.  Wanted this to be a firebase AND/OR local storage learning exploration.
      </p>
      <form>
        <input type="text" />
      </form>
    </div>
  );
};

Log.getInitialProps = ({ query }) => {
  let initProps = { query };

  logInitProps(`guestlog.js`, initProps);

  return { initProps };
};

export default Log;
