import { createContext, useContext } from "react";
import Link from "next/link";

export const OldWay = ({ hero, noPics }) => (
  <div>
    <h2>Detail:</h2>
    {!noPics && (
      <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />
    )}
    <div>
      <h3>{hero.name}</h3>
      <p>{hero.description}</p>
      <div>
        <h4>Series:</h4>
        <ul>
          {hero.series.items.map(item => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Links:</h4>
        <ul>
          {hero.urls.map(({ url }, index) => {
            let cleanUrl = url && url.substring(0, url.indexOf("?"));

            return (
              <li key={`${cleanUrl}-${index}`}>
                <a href={cleanUrl} target="_blank">
                  {cleanUrl}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
);

const HeroDetailContext = createContext();

const HeroDetail = ({ hero, children }) => (
  <HeroDetailContext.Provider value={{ hero }}>
    {children}
  </HeroDetailContext.Provider>
);

export const HeroImg = () => {
  const { hero } = useContext(HeroDetailContext);

  return <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />;
};

export const HeroBio = () => {
  const { hero } = useContext(HeroDetailContext);

  return (
    <div>
      <h2>{hero.name}</h2>
      <p>{hero.description}</p>
    </div>
  );
};

export const HeroSeries = () => {
  const { hero } = useContext(HeroDetailContext);

  return (
    <div>
      <h4>Series:</h4>
      <ul>
        {hero.series.items.map(item => (
          <li key={item.resourceURI}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const HeroLinks = () => {
  const { hero } = useContext(HeroDetailContext);

  return (
    <div>
      <h4>Links:</h4>
      <ul>
        {hero.urls.map(({ url }, index) => {
          //remove api key from the url
          let cleanUrl = url && url.substring(0, url.indexOf("?"));

          return (
            <li key={`${cleanUrl}-${index}`}>
              <a href={cleanUrl}>{cleanUrl}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const HeroEvents = ({ ordered }) => {
  const { hero } = useContext(HeroDetailContext);

  const buildListItems = items => (
    <>
      {items.map(item => {
        const eventId = item.resourceURI.match(/\/([0-9]+)/)[1];

        return (
          <Link href={`/events?eventId=${eventId}`} key={item.resourceURI}>
            <a>
              <li>{item.name}</li>
            </a>
          </Link>
        );
      })}
    </>
  );

  return (
    <div>
      <h4>Events:</h4>
      {ordered ? (
        <ol>{buildListItems(hero.events.items)}</ol>
      ) : (
        <ul>{buildListItems(hero.events.items)}</ul>
      )}
    </div>
  );
};

export default HeroDetail;
