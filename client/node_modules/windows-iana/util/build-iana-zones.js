const fs = require("mz/fs");
const path = require("path");
const xml2js = require("xml2js");

const readFile = async () => {
  const map = [];
  const fileContent = await fs.readFile(path.join(__dirname, "../timezone.xml"), "utf-8");

  let xmlObject = await new Promise((resolve, reject) => {
    xml2js.parseString(fileContent, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

  xmlObject = await xmlObject.ldmlBCP47.keyword[0].key[0].type;

  xmlObject.forEach(({ $: entry }) => {
    if (entry.deprecated) return;
    map.push({ name: entry.name, description: entry.description, alias: entry.alias.split(" ") });
  });

  return map;
};

(async () => {
  const map = await readFile();
  return await fs.writeFile(path.join(__dirname, "../iana.json"), JSON.stringify(map, null, 2), {
    encoding: "utf-8",
  });
})();
