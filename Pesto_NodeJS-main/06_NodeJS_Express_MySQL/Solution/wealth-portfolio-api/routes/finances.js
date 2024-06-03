const financesController = require('../controllers/financesController');
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
    "/api/finances",
    [authJwt.verifyToken],
    financesController.getFinances
  );

  app.post(
    "/api/finances",
    [authJwt.verifyToken],
    financesController.createFinanceRecord
  );

  app.get(
    "/api/finances/breakdown",
    [authJwt.verifyToken],
    financesController.getDetailedBreakdown
  );

};