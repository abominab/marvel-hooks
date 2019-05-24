import React, { useEffect, useRef, useState } from "react";
import HeroDetail, {
  HeroBio,
  HeroImg,
  HeroLinks,
  HeroSeries,
  HeroEvents,
  OldWay
} from "../components/Hero";
import { logInitProps } from "../utils/log";
import MarvelService from "../services/marvelService";

const MarvelPage = ({ initProps }) => {
  const [character, setCharacter] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [search, setSearch] = useState(initProps.query.search);

  const inputRef = useRef();
  const detailRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [character, characters, search]);

  useEffect(() => {
    let isCurrent = true;
    // TODO: figure out why ref isn't working
    //  - https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
    //  - https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node

    // detailRef.current ? detailRef.current.scrollIntoView(true) : console.warn(`no detailRef`);

    if (isCurrent) {
      window.scrollTo({ top: 445, behavior: `smooth` });
    }
    return () => (isCurrent = false);
  }, [character]);

  const handleSubmit = async event => {
    event.preventDefault();
    let newChars = await MarvelService.getCharacterList(search);
    setCharacters(newChars);
  };

  return (
    <div>
      <h1 className="marvel-text">Search for Marvel Characters</h1>
      {/* prettier-ignore */}
      <p>
        This page will get a list of characters matching the search param. Uses <code>useEffect</code>, <code>useRef</code>, and <code>useState</code> hooks.
      </p>
      <p>
        The input can be pre-populated with the <code>search</code> query param.
      </p>
      {/* prettier-ignore */}
      <p>
        The <code>HeroDetail</code> component is an example of composability and the <code>useContext</code> hook.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          ref={inputRef}
        />
        <button onClick={handleSubmit}>Search</button>
      </form>
      {characters && !characters.length && <p>No matching characters 😢</p>}
      {character && (
        <div ref={detailRef}>
          {/* <HeroDetail hero={character}>
            <HeroBio />
            {!initProps.query.nopics && <HeroImg />}
            <HeroLinks />
            <HeroSeries />
            <HeroEvents ordered />
          </HeroDetail> */}

          {/* LOOKATME: live coding  noPics={true} */}
          <OldWay hero={character} />
        </div>
      )}
      {characters && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {characters.map(char => (
              <li
                key={char.id}
                onClick={() => {
                  setCharacter(char);
                }}
              >
                <div>
                  <h3>{char.name}</h3>
                  <p>{char.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <hr />
        </div>
      )}
    </div>
  );
};

MarvelPage.getInitialProps = async ({ query }) => {
  let initProps = { query };

  logInitProps(`characters.js`, initProps);

  return { initProps };
};

export default MarvelPage;
