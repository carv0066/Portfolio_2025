const Dotenv = require('dotenv-webpack');

module.exports = {
  // Your other Webpack configuration here
  plugins: [
    new Dotenv()  // This will load the environment variables from your .env file
  ]
};
