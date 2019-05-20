import { createContext, useContext } from "react";

export const OldWay = ({ char, noPics }) => (
  <div>
    <h2>Detail:</h2>
    {!noPics && (
      <img src={`${char.thumbnail.path}.${char.thumbnail.extension}`} />
    )}
    <div>
      <h3>{char.name}</h3>
      <p>{char.description}</p>
      <div>
        <h4>Series:</h4>
        <ul>
          {char.series.items.map(item => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Links:</h4>
        <ul>
          {char.urls.map(({ url }, index) => {
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

const CharacterDetailContext = createContext();

const CharacterDetail = ({ char, children }) => (
  <CharacterDetailContext.Provider value={{ char }}>
    {children}
  </CharacterDetailContext.Provider>
);

export const CharacterImg = () => {
  const { char } = useContext(CharacterDetailContext);

  return <img src={`${char.thumbnail.path}.${char.thumbnail.extension}`} />;
};

export const CharacterBio = () => {
  const { char } = useContext(CharacterDetailContext);

  return (
    <div>
      <h2>{char.name}</h2>
      <p>{char.description}</p>
    </div>
  );
};

export const CharacterSeries = () => {
  const { char } = useContext(CharacterDetailContext);

  return (
    <div>
      <h4>Series:</h4>
      <ul>
        {char.series.items.map(item => (
          <li key={item.resourceURI}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const CharacterLinks = () => {
  const { char } = useContext(CharacterDetailContext);

  return (
    <div>
      <h4>Links:</h4>
      <ul>
        {char.urls.map(({ url }, index) => {
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

export default CharacterDetail;
