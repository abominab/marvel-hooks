import fetch from "isomorphic-unfetch";
import { logApi } from "../utils/log";

class MarvelService {
  constructor() {
    this.baseUrl = `https://gateway.marvel.com/v1/public`;
    this.apikey = `apikey=${process.env.MARVEL_API_KEY}`;
  }

  apiFetch = async url => {
    if (!url.includes("?")) {
      // add a question mark to the rul if there isn't one so that we can add apikey w/ an ampersand every time
      url = `${url}?`;
    }
    logApi(`Fetching`, url);

    const {
      data: { results }
    } = await fetch(`${url}&${this.apikey}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch(err => {
        console.error(err);

        // return empty array of results if we have an error
        return { data: { results: [] } };
      });

    logApi(`Results:`, results);

    return results;
  };

  // List of available calls: https://developer.marvel.com/docs
  getCharacterList = query =>
    this.apiFetch(`${this.baseUrl}/characters?nameStartsWith=${query}`);

  getCharacter = characterId =>
    this.apiFetch(`${this.baseUrl}/characters/${characterId}`);

  getComicList = query =>
    this.apiFetch(`${this.baseUrl}/comics?titleStartsWith=${query}`);

  getEventsList = query =>
    this.apiFetch(`${this.baseUrl}/events?nameStartsWith=${query}`);

  getEvent = eventId => this.apiFetch(`${this.baseUrl}/events/${eventId}`);

  getSeriesList = query =>
    this.apiFetch(`${this.baseUrl}/series?titleStartsWith=${query}`);

  getStoriesList = search => {
    const { comics, series, events, creators, characters } = search;

    let url = `${this.baseUrl}/stories?${!!comics ? `comics=${comics}` : ""}${
      !!series ? `&series=${series}` : ""
    }${!!events ? `&events=${events}` : ""}${
      !!creators ? `&creators=${creators}` : ""
    }${!!characters ? `&characters=${characters}` : ""}`;

    return this.apiFetch(url);
  };
}

export default new MarvelService();
