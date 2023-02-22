const express = require('express')
const app = express()
app.use(express.json())

const transaksiController = require('../controller/transaksiController')
let authorization = require("../middlewares/authorization")


app.put("/:id_transaksi", authorization.authorization, transaksiController.updateTransaksi)
app.delete("/:id_transaksi", authorization.authorization, transaksiController.deleteTransaksi)
app.get("/", authorization.authorization, transaksiController.getAllTransaksi)
app.post("/", authorization.authorization, transaksiController.addTransaksi)
app.post("/find", [authorization.authorization],  transaksiController.findTransaksi)




module.exports = app