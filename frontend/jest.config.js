module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/cypress/","/pages/test.js"],
  };
