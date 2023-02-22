// load model for meja table
const mejaModel = require('../models/index').meja

// load operation from Sequelize
const Op = require('sequelize').Op


// create function for read all data
exports.getAllMeja = async (request,response) => {
    // call findAll() to get all data
    let meja = await mejaModel.findAll()
    return response.json({
        success: true,
        data: meja,
        message: 'All meja have been loaded'
    })
}

// create function for filter
exports.findMeja = async (request, response) => {
    // define keyword to find data
    let keyword = request.body.keyword

    // call findAll() within where clause and
    // operation to find data based on keyword
    let meja = await mejaModel.findAll({
        where: {
            [Op.or]: [
                { nomor_meja: { [Op.substring]: keyword }},
                { ketersediaan: { [Op.substring]: keyword }}
            ]
        }
    })
    return response.json({
        success: true,
        data: meja,
        message: 'All meja have been loaded'
    })
}

// create function for add new meja
exports.addMeja = (request, response) => {
    // prepare data from request
    let newMeja = {
        nomor_meja: request.body.nomor_meja,
        ketersediaan: request.body.ketersediaan
    }

    // execute inserting data to meja's table
    mejaModel.create(newMeja)
        .then(result => {
            // if inser's process success
            return response.json({
                success: true,
                data: result,
                message: 'New meja has been inserted'
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
exports.updateMeja = (request, response) => {
    // prepare data that has been changed
    let dataMeja = {
        nomor_meja: request.body.nomor_meja,
        ketersediaan: request.body.ketersediaan
    }

    // define id meja that will be update
    let idMeja = request.params.id

    // execute update data based on defined id member
    mejaModel.update(dataMeja, {where: {id: idMeja} })
    .then(result => {
        // if update's process success
        return response.json({
            success: true,
            data: dataMeja,
            message: 'Data meja has been updated'
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
exports.deleteMeja = (request, response) => {
    // define id meja that will be update
    let idMeja = request.params.id

    // execute delete data based on defined id user
    mejaModel.destroy({ where: { id: idMeja }})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data meja has been updated'
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

exports.getMeja = async (request,response) => {
    // call findAll() to get all data
    let meja = await mejaModel.findOne({where:{id:request.params.id}})
    return response.json({
        success: true,
        data: meja,
        message: 'All meja have been loaded'
    })
}