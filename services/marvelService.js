import fetch from "isomorphic-unfetch";

class MarvelService {
  constructor() {
    this.baseUrl = `https://gateway.marvel.com/v1/public`;
    this.apikey = `apikey=${process.env.MARVEL_API_KEY}`;
  }

  logMsg = (msg, ...rest) =>
    process.env.LOG_API && console.log(`marvelService.js | ${msg}`, ...rest);

  apiFetch = async url => {
    if (!url.includes("?")) {
      // add a question mark to the rul if there isn't one so that we can add apikey w/ an ampersand every time
      url = `${url}?`;
    }
    this.logMsg(`Fetching`, url);

    const {
      data: { results }
    } = await fetch(`${url}&${this.apikey}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch(err => {
        console.error(err);

        // return empty array of results if we have an error
        return { data: { results: [] } };
      });

    this.logMsg(`Results:`, results);

    return results;
  };

  getCharacterList = query =>
    this.apiFetch(`${this.baseUrl}/characters?nameStartsWith=${query}`);

  getCharacter = characterId =>
    this.apiFetch(`${this.baseUrl}/characters/${characterId}`);

  getComicList = query =>
    this.apiFetch(`${this.baseUrl}/comics?titleStartsWith=${query}`);

  getEventsList = query =>
    this.apiFetch(`${this.baseUrl}/events?nameStartsWith=${query}`);

  getEvent = eventId => this.apiFetch(`${this.baseUrl}/events/${eventId}`);
}

export default new MarvelService();
