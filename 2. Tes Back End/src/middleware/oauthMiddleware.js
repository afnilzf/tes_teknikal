const OAuth2Server = require('oauth2-server');
const { UnauthorizedError } = require('oauth2-server');

// Inisialisasi instance OAuth2Server
const oauthServer = require('../models/oauth');

// Middleware OAuth2 untuk verifikasi token akses
const oauthMiddleware = async (req, res, next) => {
    try {
        // Verifikasi token akses dari permintaan
        // const token = await oauthServer.authenticate(req, res);

        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new Error('Access token not found');
        }

        // Token biasanya dikirim dalam format "Bearer {token}"
        const accessToken = authHeader.split(' ')[1];
        // console.log(accessToken);
        if (!accessToken) {
            throw new Error('Invalid access token format');
        }

        const token = await oauthServer.getUserFromAccessToken(accessToken)
        console.log(token)
        if (!token) {
            throw new Error('Invalid access token');
        }
        // Sekrang Anda dapat menggunakan accessToken sesuai kebutuhan, misalnya, verifikasi atau validasi
        // Lakukan verifikasi token atau apa pun yang diperlukan

        // Jika token valid, lanjutkan ke pengendali rute berikutnya
        return next();
    } catch (error) {
        // Tangani kesalahan autentikasi
        console.error('OAuth2 Error:', error.message);
        return res.status(401).json({ error: 'Unauthorized', message: error.message });
    }
};
module.exports = oauthMiddleware;
// module.exports = {
//     oauthMiddleware: oauthMiddleware,
//     oauthServer: oauthServer
// };
