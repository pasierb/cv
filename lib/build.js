const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const yaml = require("js-yaml");

function getTemplate(name) {
  return fs.readFileSync(path.join(__dirname, "../templates", `${name}.handlebars`), "utf-8");
}

function getData() {
  return yaml.load(fs.readFileSync(path.join(__dirname, "../data.yml"), "utf-8"));
}

function build() {
  const data = getData();
  const indexTemplate = handlebars.compile(getTemplate("index"));

  const indexHTML = indexTemplate(data);

  fs.writeFileSync(path.join(__dirname, "../docs/index.html"), indexHTML);
}

build();
