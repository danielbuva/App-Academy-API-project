const router = require("express").Router();
const { isProduction } = require("../config");
const {
  // serveHtml,
  // staticAssets,
} = require("../services/production.server");
const apiRouter = require("./api");

router.use("/api", apiRouter);

if (isProduction) {
  const path = require("path");
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });

  router.use(express.static(path.resolve("../frontend/build")));

  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}

module.exports = router;
