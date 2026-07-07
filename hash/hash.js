const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("aask", 10);
console.log(hash);
