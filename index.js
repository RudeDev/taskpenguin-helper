const Celesc = require("./controller/celesc");
const celesc = new Celesc();

(async () => {
  await celesc.login();
})();