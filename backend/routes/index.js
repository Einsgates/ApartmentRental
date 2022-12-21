/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
  app.use("/api", require("./home.js")(router));
  app.use("/api/users", require("./users.js")(router));
  app.use("/api/apartments/:id", require("./apartment.js")(router));
  app.use("/api/apartments", require("./apartments.js")(router));
  app.use("/api/favorites", require("./favorites.js")(router));
};
