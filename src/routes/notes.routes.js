const { Router } = require("express")

const NotesController = require("../controllers/NotesController")
const notesController = new NotesController()

const notesRoutes = Router()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

notesRoutes.use(ensureAuthenticated)

notesRoutes.get("/", notesController.index)
notesRoutes.post("/", notesController.create)
notesRoutes.put("/:id", notesController.update)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)


module.exports = notesRoutes 


 