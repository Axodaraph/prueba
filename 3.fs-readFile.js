const fs = require("node:fs");

console.log("Leyendo el primer archivo");
fs.readFile("./archivo.txt", "utf-8", (err, text) => {
  console.log(text);
});

console.log("leyendo el segundo archivo");
fs.readFile("./archivo2.txt", "utf-8", (err, text) => {
  console.log(text);
});
