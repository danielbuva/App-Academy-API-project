const router = require("express").Router();
const {
  serveHtml,
  staticAssets,
} = require("../services/production.server");
const apiRouter = require("./api");

router.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
  router.use(staticAssets);
  router.get("/", serveHtml);
  router.get(/^(?!\/?api).*/, serveHtml);
}

module.exports = router;
