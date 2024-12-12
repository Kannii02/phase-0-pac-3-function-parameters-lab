const { JSDOM } = require("jsdom");
const babel = require("babel-core");
const path = require("path");

before(function (done) {
  const babelResult = babel.transformFileSync(
    path.resolve(__dirname, "../index.js"),
    {
      presets: ["env"],
    }
  );

  const htmlPath = path.resolve(__dirname, "../index.html");
  JSDOM.fromFile(htmlPath, {
    runScripts: "dangerously",
    resources: "usable",
  })
    .then((dom) => {
      dom.window.localStorage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      };
      global.window = dom.window;
      global.document = dom.window.document;
      global.navigator = dom.window.navigator;
      done();
    })
    .catch((err) => done(err));
});
