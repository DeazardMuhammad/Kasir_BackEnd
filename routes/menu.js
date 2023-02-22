const express = require(`express`)
const app = express()

app.use(express.json())

let menuController = require("../controller/menuController")
let authorization = require("../middlewares/authorization")
let uploadImage = require("../middlewares/uploadImage")

// endpoint get data pelanggan
app.get("/", authorization.authorization, menuController.getMenu)

app.post("/find", [authorization.authorization],  menuController.findMenu)

// endpoint add data pelanggan
app.post("/", [
    authorization.authorization, 
    uploadImage.upload.single(`image`)
], menuController.addMenu)

// endpoint edit data pelanggan
app.put("/:id_menu", [
    authorization.authorization, 
    uploadImage.upload.single(`image`)
], menuController.updateMenu)

// endpoint delete pelanggan
app.delete("/:id_menu", authorization.authorization, menuController.deleteMenu)

module.exports = app