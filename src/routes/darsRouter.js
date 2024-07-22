const { Router } = require("express");
const { create, find, findAll, update, remove } = require("../controller/darslarController");
const isAuth = require("../middleWere/isAuth")

const router = Router();

router.post("/", isAuth, create);
router.get("/:id", isAuth, find);
router.get("/", isAuth, findAll);
router.put("/:id", isAuth, update);
router.delete("/:id", isAuth, remove);

module.exports = router