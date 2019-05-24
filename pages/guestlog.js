import { logInitProps } from "../utils/log";

const Log = ({ initProps }) => {
  // const [msg, setMsg] = useState("");
  // const [name, setName] = useState("");

  /**
   * LOOKATME:
   * Live Coding example.
   * Make comments show up by saving them to an array in state
   * Plug for local storage
   */

  return (
    <div>
      <h1 className="marvel-text">Guest Log</h1>
      {/* prettier-ignore */}
      <p>
        This page is meant to be a from that will allow users to leave messages.  Wanted this to be a firebase AND/OR local storage learning exploration.
      </p>
      <h2>Leave a message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
          />
        </div>
        <div>
          <label htmlFor="msg">Message:</label>
          <input
            type="text"
            value={msg}
            onChange={e => setMsg(e.target.value)}
            name="msg"
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
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
