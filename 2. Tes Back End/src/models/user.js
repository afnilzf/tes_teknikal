const pool = require('../config/database')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const OAuth2Server = require('oauth2-server');


const getAllUsers = async (spv = null) => {
    try {
        let query, values;

        if (spv !== null) {
            query = `SELECT * FROM app.users WHERE npp_supervisor = $1`;
            values = [spv];
        } else {
            query = `SELECT * FROM app.users`;
            values = [];
        }

        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Meneruskan kesalahan ke panggilan berikutnya
    }
};

const createNewUser = async (body) => {
    const hashPassword = bcrypt.hashSync(body.passwrd)
    const { clientId, clientSecret } = generateClientIdAndSecret();
    try {
        let query, values;

        query = `INSERT INTO app.users(
                    nama, email, npp, npp_supervisor, passwrd, level,client_id,client_secret
                    )VALUES(
                    $1,$2,$3,$4,$5,$6,$7,$8
                    )RETURNING *;`;
        values = [
            body.name,
            body.email,
            body.npp,
            body.npp_supervisor,
            hashPassword,
            body.level,
            clientId,
            clientSecret
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error("Error inserting users:", error);
        throw error; // Meneruskan kesalahan ke panggilan berikutnya
    }
}

const deleteUser = async (id) => {
    try {
        let query, values;
        query = `DELETE FROM app.users WHERE id = $1`;
        values = [id];
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Meneruskan kesalahan ke panggilan berikutnya
    }
}

const generateClientIdAndSecret = () => {
    const clientId = crypto.randomBytes(16).toString('hex');
    const clientSecret = crypto.randomBytes(32).toString('hex');
    return { clientId, clientSecret };
};


const getUserByEmail = async (email) => {
    try {
        const query = `SELECT * FROM app.users WHERE email = $1`;
        const values = [email];
        const { rows } = await pool.query(query, values);
        return rows[0]; // Mengembalikan pengguna yang sesuai dengan email
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
};
const getUserById = async (id) => {
    try {
        const query = `SELECT * FROM app.users WHERE id = $1`;
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0]; // Mengembalikan pengguna yang sesuai dengan email
    } catch (error) {
        console.error("Error fetching user by id:", error);
        throw error;
    }
};

const getClientByClientIdAndSecret = async (clientId, clientSecret) => {
    try {
        const query = `SELECT client_id,client_secret FROM app.users WHERE client_id = $1 AND client_secret = $2`;
        const values = [clientId, clientSecret];
        const { rows } = await pool.query(query, values);
        return rows[0]; // Mengembalikan klien yang sesuai dengan ID klien dan secret klien
    } catch (error) {
        console.error("Error fetching client by ID and secret:", error);
        throw error;
    }
};

const getTokenInfo = async (accessToken) => {
    try {
        const query = `SELECT * FROM app.users WHERE access_token = $1`;
        const values = [accessToken];
        const { rows } = await pool.query(query, values);
        return rows[0]; // Mengembalikan klien yang sesuai dengan ID klien dan secret klien
    } catch (error) {
        console.error("Error fetching client by ID and secret:", error);
        throw error;
    }
};

const saveToken = async (token, client_id, user) => {
    try {
        const expireTime = new Date(); // Misalnya, token berlaku selama 1 jam
        expireTime.setHours(expireTime.getHours() + 1); // Atur waktu kadaluarsa

        const query = `
            UPDATE app.users SET access_token = $1,
              expire_time =$2
               where id = $3
            RETURNING *;
        `;
        const values = [token, expireTime, user];
        const { rows } = await pool.query(query, values);
        return rows[0]; // Mengembalikan token yang disimpan
    } catch (error) {
        console.error("Error saving token:", error);
        throw error;
    }
};
module.exports = {
    getAllUsers, createNewUser, deleteUser, getUserByEmail, getClientByClientIdAndSecret, saveToken, getUserById, getTokenInfo
};
