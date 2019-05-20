// phase is the current context in which the configuration is loaded. You can see all phases at https://github.com/zeit/next.js/blob/master/packages/next-server/lib/constants.js. Phases can be imported from next/constants

const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = (phase, { defaultConfig }) => {
  return {
    //   TODO: understand this wizardry - https://jaketrent.com/post/environment-variables-in-nextjs/
    webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

      return config;
    }
  };
};
