const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next) {

const { authorization } = request.headers

if(!authorization) {
  throw new AppError("JWT Token não provisionado", 401)
}

const [, token] = authorization.split(" ")


try {
  const { sub: user_id } = verify(token, authConfig.jwt.secret)

  request.user = {
    id: Number(user_id)
  }

  return next()
} catch {
  throw new AppError("JWT Token não provisionado", 401)
}
}

module.exports = ensureAuthenticated