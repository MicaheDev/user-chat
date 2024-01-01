// Añadir en el package.json
// "build:component": "ng build --prod --output-hashing none && node build-web-cp.js"
const fs = require("fs-extra");
const concat = require("concat");

build = async () => {
  const files = [
    "./dist/user-chat/runtime.js",
    "./dist/user-chat/polyfills.js",
    "./dist/user-chat/main.js",
  ];

  await fs.ensureDir("custom-elements");
  await concat(files, "custom-elements/user-chat.js");
};
build();
