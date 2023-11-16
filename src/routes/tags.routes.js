const { Router } = require("express")

const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()

const tagsRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

tagsRoutes.get("/", ensureAuthenticated, tagsController.index)



module.exports = tagsRoutes 


