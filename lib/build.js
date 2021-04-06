const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const yaml = require("js-yaml");

const PAGE_BREAKS = {
  "articles": {
    3: true
  }
}

const PAGE_BREAK_MARKUP = new handlebars.SafeString(`<li class="page-break"></li>`);

handlebars.registerHelper('pageBreak', (...args) => {
  let level = PAGE_BREAKS;

  for (let i=0; i<args.length-1; i++) {
    level = level[args[i]];

    if (level === true) break;
    if (!level) return null;
  }

  return "page-break";
});

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
