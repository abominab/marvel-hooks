import { useEffect, useState } from "react";
import { logInitProps } from "../utils/log";

const Log = ({ initProps }) => {
  const [name, setName] = useState(initProps.query.name || null);
  const [msg, setMsg] = useState(null);
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    if (msgs.length > 0) {
      document.title = `${msgs[msgs.length - 1].name} added a comment`;
    }
  }, [msgs]);

  const handleSubmit = async newMsg => {
    event.preventDefault();
    setMsgs([...msgs, newMsg]);
    setMsg("");
    setName("");
  };

  return (
    <div>
      <h1 className="marvel-text">Guest Log</h1>
      {/* prettier-ignore */}
      <p>
        This page is meant to be a from that will allow users to leave messages.  Wanted this to be a firebase AND/OR local storage learning exploration.
      </p>
      <h2>Leave a message</h2>
      <form onSubmit={handleSubmit}>
        <div className="formItem">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="msg">Message:</label>
          <textarea
            name="msg"
            rows="5"
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />
        </div>
        <button onClick={() => handleSubmit({ msg, name })}>Submit</button>
      </form>

      {msgs &&
        msgs.map(msg => (
          <div>
            <p>{msg.name}</p>
            <p>{msg.msg}</p>
          </div>
        ))}

      <style jsx>{`
        form .formItem {
          display: flex;
          margin: 10px 20px;
        }

        form .formItem * {
          flex-basis: 40%;
        }

        form .formItem label {
          margin: 0 8px;
          text-align: right;
          flex-basis: 5%;
        }
      `}</style>
    </div>
  );
};

Log.getInitialProps = ({ query }) => {
  let initProps = { query };

  logInitProps(`guestlog.js`, initProps);

  return { initProps };
};

export default Log;
