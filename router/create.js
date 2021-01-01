const routes = require('express').Router()
const fs = require('fs')

routes.post('/create', (req, res) => {
    const key = req.body["key"]
    const value = req.body["value"]
    
    //if TTL is not given then assigning TTL = -1 as CurrentTIme - CreatedTime > -1, assuming server time is changed
    var ttl = isNaN(parseInt(req.body["ttl"]))? -1 : parseInt(req.body["ttl"])

    if(key === undefined || value === undefined){
        res.send("Error: Could not parse POST data")
        return
    }
    
    //Data stored as {Key, createdTime, currentTime}
    fs.readFile('data.json', 'utf8', (err, data) => {
        const currentTime = Date.now();
        if(err){
            //If file is not present, create and store data
            obj = {[key]: {"value": value, "createdTime": currentTime, "ttl": ttl}}
            json = JSON.stringify(obj)
            fs.writeFile('data.json', json, 'utf8', (err) => {
                if(err)
                    res.send("Error: Could not write into file")
                else   
                    res.send("Successfully added data")
            })
        }
        else{
            obj = JSON.parse(data)
            if(!(key in obj) || ((currentTime - obj[key]["createdTime"] > obj[key]["ttl"] * 1000) && obj[key]["ttl"] != -1)){
                obj[key] = {"value": value, "createdTime": currentTime, "ttl": ttl}
                json = JSON.stringify(obj)
                fs.writeFile('data.json', json, 'utf8', (err) => {
                    if(err)
                        res.send("Error: Could not write into file")
                    else
                        res.send("Data is added sucessfully ")
                })
            }
            else
                res.send(" Error : This key already exists")
        }
    })
})

module.exports = routes