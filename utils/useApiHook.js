// TODO: Custom hook that will show that content is loading?
const { useEffect, useState } = require("react");
import MarvelService from "../services/marvelService";

function useApi(apiMethod, ...args) {
  const [results, setResults] = useState(null);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    // Change the title because I couldn't come up w/ something more creative.
    // Ideally I would like this TODO: show a spinner on the page while things are loading.
    document.title = `Fetching Data!`;

    let isCurrent = true;

    MarvelService[apiMethod](...args).then(res => {
      document.title = `Data Fetched!`;
      if (isCurrent) {
        setAttempted(true);
        setResults(res);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return { results, attempted };
}

export { useApi };
