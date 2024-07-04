const jwt = require('jsonwebtoken');
jwtSecret = 'secret'

exports.decodeUserInfo = function (token){
  if(token){
    try{
      let decoded = jwt.verify(token, jwtSecret);

      return decoded
    } catch (e) {
      console.log("Error decoding token: ", e);
      return null;
    }
  } else {
    console.log("No token found!")
    return null
  }
}

exports.diretorAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.send("Not authorized", 401)
      } else {
        if (decodedToken.type !== "Diretor") {
          res.send("Not authorized", 401)
        } else {
          next()
        }
      }
    })
  } else {
    res.send("Not authorized", 401)
  }
}

exports.gerenteAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.send("Not authorized", 401)
        } else {
          if (decodedToken.type !== "Gerente" && decodedToken.type !== "Diretor") {
            res.send("Not authorized", 401)
          } else {
            next()
          }
        }
      })
    } else {
      res.send("Not authorized", 401)
    }
  }
  
  exports.colaboradorAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.send("Not authorized", 401)
        } else {
          if (decodedToken.type !== "Colaborador" && decodedToken.type !== "Gerente" && decodedToken.type !== "Diretor"){
            res.send("Not authorized", 401)
          } else {
            next()
          }
        }
      })
    } else {
      res.send("Not authorized", 401)
    }
  }