const routes = require('express').Router()
const fs = require('fs')

routes.post('/delete', (req, res) => {
    const key = req.body["key"]
    if(key === undefined){
        res.send("Error: Could not parse GET data")
        return
    }
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err)
            res.send("Error: Could not read data")
        else{
            obj = JSON.parse(data)
            const currentTime = Date.now()

            if(key in obj && (currentTime - obj[key]["createdTime"] <= obj[key]["ttl"] * 1000 || obj[key]["ttl"] == -1)){
                //Deleting from object and then using JSON.stringify to store in file
                delete obj[key]
                json = JSON.stringify(obj)
                fs.writeFile('data.json', json, 'utf8', (err) => {
                    if(err)
                        res.send("Error: Could not delete from file")
                    else
                        res.send("Successfully deleted data")
                })
            }
            else
                res.send("Error: No such key found")
        }
    })
})

module.exports = routes