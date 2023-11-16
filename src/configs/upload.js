const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

const TEMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TEMP_FOLDER, "uploads")

const MULTER = {
  storage: multer.diskStorage({
    //Os arquivos temporários vão para TEMP_FOLDER
    destination: TEMP_FOLDER,

    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex")

      const fileNameAndHash = `${fileHash}`-`${file.originalname}`

      callback(null, fileNameAndHash)
    }
  })
}

module.exports = {
  TEMP_FOLDER, 
  UPLOADS_FOLDER,
  MULTER
}