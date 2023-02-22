// load model for transaksi table
const transaksiModel = require('../models/index').transaksi

// load operation from Sequelize
const Op = require('sequelize').Op


// create function for read all data
exports.getAllTransaksi = async (request,response) => {
    // call findAll() to get all data
    let transaksi = await transaksiModel.findAll()
    return response.json({
        success: true,
        data: transaksi,
        message: 'All transaksi have been loaded'
    })
}

// create function for filter
exports.findTransaksi = async (request, response) => {
    // define keyword to find data
    let keyword = request.body.keyword

    // call findAll() within where clause and
    // operation to find data based on keyword
    let transaksi = await transaksiModel.findAll({
        where: {
            [Op.or]: [
                { tgl_transaksi: { [Op.substring]: keyword }},
                { id_user: { [Op.substring]: keyword }},
                { id_meja: { [Op.substring]: keyword }},
                { nama_pelanggan: { [Op.substring]: keyword }},
                { status: { [Op.substring]: keyword }},
            ]
        }
    })
    return response.json({
        success: true,
        data: transaksi,
        message: 'All transaksi have been loaded'
    })
}

// create function for add new transaksi
exports.addTransaksi = (request, response) => {
    // prepare data from request
    let newTransaksi = {
        tgl_transaksi: request.body.tgl_transaksi,
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status,
    }

    // execute inserting data to transaksi's table
    transaksiModel.create(newTransaksi)
        .then(result => {
            // if inser's process success
            return response.json({
                success: true,
                data: result,
                message: 'New transaksi has been inserted'
            })
        })
        .catch(error => {
            // if insert's process fail
            return response.json({
                success: false,
                message: error.message
            })
        })
}

// create function for update member
exports.updateTransaksi = (request, response) => {
    // prepare data that has been changed
    let dataTransaksi = {
        tgl_transaksi: request.body.tgl_transaksi,
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status,
    }

    // define id transaksi that will be update
    let idTransaksi = request.params.id

    // execute update data based on defined id member
    transaksiModel.update(dataTransaksi, {where: {id: idTransaksi} })
    .then(result => {
        // if update's process success
        return response.json({
            success: true,
            data: dataTransaksi,
            message: 'Data transaksi has been updated'
        })
    })
    .catch(error =>{
        // if update's process fail
        return response.json({
            success: false,
            message: error.message
        })
    })
}

// create function to delete data
exports.deleteTransaksi = (request, response) => {
    let params = {
        id_transaksi: request.params.id_transaksi
    }

    transaksiModel.destroy({ where: params })
        .then(result => {
            return response.json({
                message: `Data transaksi berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.getTransaksi = async (request,response) => {
    // call findAll() to get all data
    let transaksi = await transaksiModel.findOne({where:{id:request.params.id}})
    return response.json({
        success: true,
        data: transaksi,
        message: 'All transaksi have been loaded'
    })
}