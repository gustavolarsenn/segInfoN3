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