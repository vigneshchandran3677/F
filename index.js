const express = require('express')
const router = require('./router/router')   //importing all router functions

const app = express()

app.use(express.json())

app.use(router)

//Handling error when the POST JSON has a bad format

app.use(function (error, req, res, next) {
    
  if(error instanceof SyntaxError){
        res.send("Error: Bad JSON format")
    }
  else {
      next();
    }
});

app.listen(3000) //waiting for request