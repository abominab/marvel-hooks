import { useEffect, useState } from "react";
import { logInitProps } from "../utils/log";
import MarvelService from "../services/marvelService";

function Comics({ initProps }) {
  const [comics, setComics] = useState(null);
  const [search, setSearch] = useState(
    initProps.query.seed || initProps.randomLetter
  );

  const getComics = searchQuery => {
    let isCurrent = true;
    (async () => {
      MarvelService.getComicList(search).then(comics => {
        if (isCurrent) {
          setComics(comics);
        }
      });
    })();
    return () => {
      isCurrent = false;
    };
  };

  useEffect(() => {
    document.title = `List of '${search}' comics`;
    getComics(search);
  }, [search]);

  return (
    <div>
      <h1 className="marvel-text">Comics Page</h1>
      <p>
        This page uses the <code>useEffect</code> hook to fetch data on load as
        well as whenever the button is clicked.
      </p>
      <p>
        The search criteria is a random letter unless a <code>seed</code> query
        param is provided.
      </p>
      <button
        onClick={() => {
          setSearch(getRandomLetter());
        }}
      >
        Load Comic List
      </button>
      {comics && comics.map(comic => <Comic comic={comic} key={comic.id} />)}
    </div>
  );
}

Comics.getInitialProps = async ({ query }) => {
  const randomLetter = getRandomLetter();

  // FIXME: server side fetch requires extra stuff for API - https://developer.marvel.com/documentation/authorization
  // const comics = await MarvelService.getComicList(query.seed || randomLetter);

  let initProps = { query, randomLetter };

  logInitProps(`comics.js`, initProps);

  return { initProps };
};

export default Comics;

const Comic = ({ comic }) => {
  return (
    <div>
      <h2>{comic.title}</h2>
      <p>{comic.description}</p>
      <p>
        <a href={comic.resourceURI}>{comic.resourceURI}</a>
      </p>
      <div>
        <h3>Prices:</h3>
        <ul>
          {comic.prices.map(({ price, type }) => (
            <li key={`${comic.id}-${type}`}>
              {type} - {price}
            </li>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  );
};

const getRandomLetter = () =>
  `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.charAt(Math.floor(Math.random(Date.now()) * 26));
