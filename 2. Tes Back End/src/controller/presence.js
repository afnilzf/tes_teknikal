const pool = require('../config/database')
const presenceModel = require('../models/epresence')


const getAllPresence = async (req, res) => {
    const spv = req.query.spv;
    try {
        const users = await presenceModel.getAllPresence(spv);
        res.json(users);
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({
            error: "Internal server error",
            serverMessage: error,
        });
    }
}


const insertNewPresence = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];
    const { body } = req
    try {
        await presenceModel.insertNewPresence(body, accessToken)
        res.status(201).json({
            message: "Create new user success",
            data: body
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            serverMessage: error,
        });
    }
}

const updateApproval = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const users = await presenceModel.updateApproval(body, id);
        res.json({
            error: "approval success",
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            serverMessage: error,
        });
    }

}


module.exports = {
    getAllPresence,
    insertNewPresence,
    updateApproval
}