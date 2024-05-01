const OAuth2Server = require('oauth2-server');
const bcrypt = require('bcryptjs')
const userModel = require('./user');

const oauthModel = {
    // Fungsi untuk mendapatkan informasi pengguna berdasarkan kredensial
    getUser: async (email, password) => {
        try {
            // Cek kredensial pengguna
            const user = await userModel.getUserByEmail(email);
            if (!user || !bcrypt.compareSync(password, user.passwrd)) {
                return false;
            }
            // Jika kredensial valid, kembalikan informasi pengguna
            return { id: user.id };
        } catch (error) {
            console.error("Error getting user:", error);
            throw error('Internal server error', { code: 500 });
        }
    },

    // Fungsi untuk mendapatkan klien berdasarkan ID klien
    getClient: async (clientId, clientSecret) => {
        try {
            // Panggil fungsi getClientByClientIdAndSecret dari userModel
            const client = await userModel.getClientByClientIdAndSecret(clientId, clientSecret);
            return client;
        } catch (error) {
            console.error("Error fetching client by ID and secret:", error);
            throw error;
        }
    },

    // Fungsi untuk menyimpan token akses
    saveToken: async (token, client, user) => {
        try {
            // Panggil fungsi saveToken dari userModel
            const savedToken = await userModel.saveToken(token, client, user);
            return savedToken;
        } catch (error) {
            console.error("Error saving token:", error);
            throw error;
        }
    },
    generateAccessToken: async (client, user, scope) => {
        try {
            // Logika sederhana untuk menghasilkan token akses
            const accessToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
            return accessToken;
        } catch (error) {
            console.error("Error generating access token:", error);
            throw error;
        }
    },
    getUserFromAccessToken: async (accessToken) => {
        try {

            const tokenInfo = await userModel.getTokenInfo(accessToken);

            if (!tokenInfo || tokenInfo.expire_time < new Date()) {
                // Token tidak ditemukan atau sudah kedaluwarsa
                throw new Error('Invalid access token');
            }
            console.log(tokenInfo.expire_time < new Date())
            // Token valid, kembalikan informasi pengguna
            return tokenInfo; // Misalnya, hanya ID pengguna yang diperlukan
        } catch (error) {
            console.error("Error fetching user from access token:", error);
            throw new Error('Invalid access token');
        }
    },
    getAccessToken: async (accessToken) => {
        try {
            // Lakukan logika untuk mendapatkan token akses dari database
            const tokenInfo = await userModel.getTokenInfo(accessToken);
            return tokenInfo; // Kembalikan token akses jika ditemukan
        } catch (error) {
            console.error("Error fetching access token:", error);
            throw new OAuth2Server.UnauthorizedError('Invalid access token');
        }
    },
};

module.exports = oauthModel;