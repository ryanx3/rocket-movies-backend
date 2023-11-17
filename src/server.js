require("express-async-errors")
const cors = require("cors")

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")

const uploadConfig = require("./configs/upload")

const express = require("express")
const routes = require("./routes")

migrationsRun()

const app = express()
app.use(express.json())
app.use(routes)
app.use(cors())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

   return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const port = 3000
app.listen(port, () => console.log(`Server is running on Port ${port}`))
