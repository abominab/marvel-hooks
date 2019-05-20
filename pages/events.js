import { useState } from "react";
import { useApi } from "../utils/useApiHook";

const Events = ({ initProps }) => {
  const { results, attempted = false } = useApi(
    "getEvent",
    initProps.query.eventId || 245
  );

  return (
    <div>
      <h1 className="marvel-text">Events Page</h1>
      <p>
        This page fetches data using a custom hook, <code>useApi</code>.
      </p>
      <p>
        The event is always the same unless an <code>eventId</code> query param
        is provided.
      </p>
      {attempted ? (
        results && results.length ? (
          <p>Fetch Attempted</p>
        ) : (
          <p>Fetch Attempted and you got nothing 😢</p>
        )
      ) : (
        <p>No Fetch attempted 😤</p>
      )}
      {results &&
        results.map(result => (
          <div key={result.id}>
            <h2>{result.title}</h2>
            <img
              src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
            />
            <div>
              <p>{result.description}</p>
              <div>
                <h4>Series:</h4>
                <ul>
                  {result.series.items.map(item => (
                    <li key={item.resourceURI}>{item.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Characters:</h4>
                <ul>
                  {result.characters.items.map(item => (
                    <li key={item.resourceURI}>{item.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

Events.getInitialProps = ({ query }) => {
  let initProps = { query };
  process.env.LOG_INIT_PROPS &&
    console.log(`events.js | getInitialProps:`, initProps);
  return { initProps };
};

export default Events;
