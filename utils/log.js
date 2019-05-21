export const logInitProps = (fileName, props) => {
  if (process.env.LOG_INIT_PROPS === "true") {
    console.log(`${fileName} | getInitialProps:`, props);
  }
};

export const logApi = (msg, ...rest) => {
  if (process.env.LOG_API === "true") {
    console.log(`marvelService.js | ${msg}`, ...rest);
  }
};
