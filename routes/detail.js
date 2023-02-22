const express = require('express')
const app = express()
app.use(express.json())

const detailController = require('../controller/detailController')
let authorization = require("../middlewares/authorization")


app.put("/:id", authorization.authorization, detailController.updateDetail)
app.delete("/:id", authorization.authorization, detailController.deleteDetail)
app.get("/", authorization.authorization, detailController.getAllDetail)
app.post("/", authorization.authorization, detailController.addDetail)
app.post("/find", [authorization.authorization],  detailController.findDetail)


module.exports = app