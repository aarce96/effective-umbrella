const router = require("express").Router();

const apiRoutes = require("./api/user-routes");

// keep getting errors in the login api routes
// const loginRoutes = require("./api/login-routes");

router.use("/api", apiRoutes);
// router.use("/auth", loginRoutes);

module.exports = router;
