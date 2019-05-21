const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

// https://nextjs.org/docs/#custom-configuration
//   TODO: understand this wizardry - https://jaketrent.com/post/environment-variables-in-nextjs/
module.exports = (phase, { defaultConfig }) => {
  return {
    webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

      return config;
    }
  };
};
