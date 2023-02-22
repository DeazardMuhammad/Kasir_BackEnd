const express = require('express')
const app = express()
app.use(express.json())

const mejaController = require('../controller/mejaController')
let authorization = require("../middlewares/authorization")


app.put("/:id", authorization.authorization, mejaController.updateMeja)
app.delete("/:id", authorization.authorization, mejaController.deleteMeja)
app.get("/", authorization.authorization, mejaController.getAllMeja)
app.post("/", authorization.authorization, mejaController.addMeja)
app.post("/find", [authorization.authorization],  mejaController.findMeja)


module.exports = app