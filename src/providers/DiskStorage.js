const path = require("path")
const fs = require("fs")
const uploadConfig = require("../configs/upload")

class DiskStorage {

  //Usamos o fs.promises.rename para trocar os arquivos de lugar, ou seja, quando o file for salvo, sairá da pasta temporária TEMP e irá para UPLOADS e retornamos o arquivo no seu novo local
  //Usamos uploadConfig para entrar dentro de TEMP e pegar o file após a virgula
  async saveFile(file) {
    await fs.promises.rename(

      path.resolve(uploadConfig.TEMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )
    return file
  }

  //Na const filePath pegamos o arquivo salvo de dentro de UPLOADS
  //Usamos o promise.stat para verificar se existe algo lá dentro
  //Usamos o promise.unlink para excluir o arquivo
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      return
    }
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage