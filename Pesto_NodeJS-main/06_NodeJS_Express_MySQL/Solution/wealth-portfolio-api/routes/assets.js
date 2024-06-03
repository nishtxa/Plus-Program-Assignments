const assetsController = require('../controllers/assetsController');
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/assets",
    [authJwt.verifyToken],
    assetsController.getAllAssets
  );

  app.post(
    "/api/assets",
    [authJwt.verifyToken],
    assetsController.createAsset
  );

  app.put(
    "/api/assets/:assetId",
    [authJwt.verifyToken],
    assetsController.updateAsset
  );

  app.delete(
    "/api/assets/:assetId",
    [authJwt.verifyToken],
    assetsController.deleteAsset
  );

};