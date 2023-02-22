let modelMenu = require("../models/index").menu

let path = require("path")
let fs = require("fs")


exports.getMenu = async (request, response) => {
    let dataMenu = await modelMenu.findAll()
    return response.json(dataMenu)
}

exports.findMenu = async (request, response) => {
    let keyword = request.body.keyword

    let sequelize = require(`sequelize`)
    let Op = sequelize.Op

    /**
     * query = select * from pelanggan where username like "%keyword%" or
     * pelanggan like "%keyword%"
     */
    let dataMenu = await modelMenu.findAll({
        where: {
            [Op.or]:{
                nama_menu: {[Op.like]: `%${keyword}%`},
                deskripsi: {[Op.like]: `%${keyword}%`},
                harga: {[Op.like]: `%${keyword}%`},
                jenis: {[Op.like]: `%${keyword}%`},
            }
        }
    })
    return response.json(dataMenu)
}

exports.addMenu = (request, response) => {
    if (!request.file) {
        return response.json({
            message: `Nothing to upload`
        })
    }

    let dataMenu = {
        nama_menu: request.body.nama_menu,
        deskripsi: request.body.deskripsi,
        image: request.file.filename,
        harga: request.body.harga,
        jenis: request.body.jenis,
    }

    modelMenu.create(dataMenu)
        .then(result => {
            return response.json({
                message: `Data menu berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.updateMenu = async (request, response) => {
    let idMenu = request.params.id_menu

    let dataMenu = {
        nama_menu: request.body.nama_menu,
        deskripsi: request.body.deskripsi,
        image: request.file.filename,
        harga: request.body.harga,
        jenis: request.body.jenis,
    }

    if(request.file) {
        // jika edit menyertakan file gambar
        let menu = await modelMenu.findOne({where:{id_menu: idMenu}})
        let oldFileName = menu.image

        //delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        //menyisipkan nama file baru ke da,am objek datasiswa
        dataMenu.image = request.file.filename
    }

    modelMenu.update(dataMenu, { where: {id_menu: idMenu} })
        .then(result => {
            return response.json({
                message: `Data menu berhasil diubah`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.deleteMenu = async(request, response) => {
    let idMenu = request.params.id_menu

    // ambil dulu data filename yang akan dihapus
    let menu = await modelMenu.findOne({where: {id_menu: idMenu}})
    if (menu) {
        let oldFileName = menu.image

        // delet file 
        let location = path.join(__dirname,"../image", oldFileName)
        fs.unlink(location, error => console.log(error))
    }

    modelMenu.destroy({ where: {id_menu: idMenu} })
        .then(result => {
            return response.json({
                message: `Data menu berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}