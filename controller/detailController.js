// load model for detail table
const detailModel = require('../models/index').detail_transaksi

// load operation from Sequelize
const Op = require('sequelize').Op


// create function for read all data
exports.getAllDetail = async (request,response) => {
    // call findAll() to get all data
    let detail = await detailModel.findAll()
    return response.json({
        success: true,
        data: detail,
        message: 'All detail have been loaded'
    })
}

// create function for filter
exports.findDetail = async (request, response) => {
    // define keyword to find data
    let keyword = request.body.keyword

    // call findAll() within where clause and
    // operation to find data based on keyword
    let detail = await detailModel.findAll({
        where: {
            [Op.or]: [
                { id_transaksi: { [Op.substring]: keyword }},
                { id_menu: { [Op.substring]: keyword }},
                { quantity: { [Op.substring]: keyword }},
                { harga: { [Op.substring]: keyword }},

            ]
        }
    })
    return response.json({
        success: true,
        data: detail,
        message: 'All detail have been loaded'
    })
}

// create function for add new detail
exports.addDetail = (request, response) => {
    // prepare data from request
    let newDetail = {
        id_transaksi: request.body.id_transaksi,
        id_menu: request.body.id_menu,
        quantity: request.body.quantity,
        harga: request.body.harga,
    }

    // execute inserting data to detail's table
    detailModel.create(newDetail)
        .then(result => {
            // if inser's process success
            return response.json({
                success: true,
                data: result,
                message: 'New detail has been inserted'
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
exports.updateDetail = (request, response) => {
    // prepare data that has been changed
    let dataDetail = {
        quantity: request.body.quantity,
        harga: request.body.harga,
    }

    // define id detail that will be update
    let idDetail = request.params.id

    // execute update data based on defined id member
    detailModel.update(dataDetail, {where: {id: idDetail} })
    .then(result => {
        // if update's process success
        return response.json({
            success: true,
            data: dataDetail,
            message: 'Data detail has been updated'
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
exports.deleteDetail = (request, response) => {
    // define id detail that will be update
    let idDetail = request.params.id

    // execute delete data based on defined id detail
    detailModel.destroy({ where: { id: idDetail }})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data detail has been updated'
        })
    })
    .catch(error => {
        // if update's process fail
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.getDetail = async (request,response) => {
    // call findAll() to get all data
    let detail = await detailModel.findOne({where:{id:request.params.id}})
    return response.json({
        success: true,
        data: detail,
        message: 'All detail have been loaded'
    })
}