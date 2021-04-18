const Router = require("express-promise-router");
const controller = require("./userController");

module.exports = () => {
    const router = Router({
        mergeParams: true
    });

    router.route("/add").post(controller.add);
    router.route("/healthcheck").get(controller.healthCheck);
    return router;
};
