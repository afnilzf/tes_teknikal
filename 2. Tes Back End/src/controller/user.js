const pool = require('../config/database')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')


const getAllUsers = async (req, res) => {
    const spv = req.query.spv;
    try {
        const users = await userModel.getAllUsers(spv);
        res.json(users);
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({
            error: "Internal server error",
            serverMessage: error,
        });
    }
}


const createNewUser = async (req, res) => {

    const { body } = req
    // console.log(body)
    try {
        await userModel.createNewUser(body)
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

const updateUser = (req, res) => {
    const { id } = req.params;
    // console.log(id)
    res.json({
        message: "update user success",
        data: req.body
    })

}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userModel.deleteUser(id);
        res.json({
            error: "Delete user success",
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            serverMessage: error,
        });
    }
}

const getUser = async (email, password) => {
    try {
        // console.log('te');
        // Cek kredensial pengguna
        const user = await userModel.getUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.passwrd)) {
            return false;
        }
        // Jika kredensial valid, kembalikan informasi pengguna
        return { id: user.id };
    } catch (error) {
        console.error("Error getting user:", error);
        throw new OAuth2Server.ServerError('Internal server error', { code: 500 });
    }
}
const generateAccessToken = async (client, user, scope) => {
    try {
        // Logika sederhana untuk menghasilkan token akses
        const accessToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        return accessToken;
    } catch (error) {
        console.error("Error generating access token:", error);
        throw error;
    }
}
const loginAndGenerateToken = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Login pengguna
        const user = await getUser(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Kredensial tidak valid' });
        }

        const dataUser = await userModel.getUserById(user.id)
        const client = await getClient(dataUser.clientId, dataUser.client_secret); // Ganti dengan data sesuai kebutuhan
        const accessToken = await generateAccessToken(client, user, null);
        await saveToken(accessToken, dataUser.clientId, user.id)
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.json({ message: 'Login berhasil' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const getClient = async (clientId, clientSecret) => {
    try {
        // Panggil fungsi getClientByClientIdAndSecret dari userModel
        const client = await userModel.getClientByClientIdAndSecret(clientId, clientSecret);
        return client;
    } catch (error) {
        console.error("Error fetching client by ID and secret:", error);
        throw error;
    }
}

const getUserByEmail = async (req, res) => {
    const email = req.query.email;
    try {
        const users = await userModel.getUserByEmail(email);
        res.json(users);
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({
            error: "Internal server error",
            serverMessage: error,
        });
    }
}
const getClientByClientIdAndSecret = async (req, res) => {
    const clientId = req.query.clientId;
    const clientSecret = req.query.clientSecret;
    try {
        const client = await userModel.getClientByClientIdAndSecret(clientId, clientSecret);
        res.json(client);
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({
            error: "Internal server error",
            serverMessage: error,
        });
    }
}
const saveToken = async (token, client, user) => {
    try {
        // Panggil fungsi saveToken dari userModel
        const savedToken = await userModel.saveToken(token, client, user);
        return savedToken;
    } catch (error) {
        console.error("Error saving token:", error);
        throw error;
    }
}
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getClientByClientIdAndSecret,
    loginAndGenerateToken
}