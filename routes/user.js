const express =  require(`express`)
const app = express()

app.use(express.json())

let userController = require("../controller/userController")
let authorization = require("../middlewares/authorization")
const userValidator = require("../middlewares/userValidator")
// endpoint get data pelanggan
app.get("/", authorization.authorization, userController.getUser)

app.post("/find", [authorization.authorization], userController.findUser)

// endpoint add data pelanggan
app.post("/", [userValidator.validate], userController.addUser)

// endpoint edit data pelanggan
app.put("/:id_user", authorization.authorization, userController.updateUser)

// endpoint delete pelanggan
app.delete("/:id_user", authorization.authorization, userController.deleteUser)

app.post("/auth",  userController.authentication)
module.exports = app