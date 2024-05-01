const pool = require('../config/database')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')

const getAllPresence = async (spv = null) => {
    try {
        let query, values;

        if (spv !== null) {
            query = `SELECT
                        e.id_users AS id_user,
                        u.nama AS nama_user,
                        TO_CHAR(DATE(e.waktu), 'YYYY-MM-DD') AS tanggal,
                        MAX(CASE WHEN e.type = 'IN' THEN TO_CHAR(e.waktu, 'HH24:MI:SS') END) AS waktu_masuk,
                        MAX(CASE WHEN e.type = 'OUT' THEN TO_CHAR(e.waktu, 'HH24:MI:SS') END) AS waktu_keluar,
                        CASE WHEN MAX(CASE WHEN e.type = 'IN' THEN e.is_approve END) = 0 THEN 'REJECT' ELSE 'APPROVE' END AS status_masuk,
                        CASE WHEN MAX(CASE WHEN e.type = 'OUT' THEN e.is_approve END) = 0 THEN 'REJECT'
                             WHEN MAX(CASE WHEN e.type = 'OUT' THEN e.is_approve END) = 1 THEN 'APPROVE'
                             ELSE '-' END AS status_keluar
                    FROM
                        app.epresence e
                    JOIN
                        app.users u ON e.id_users = u.id
                    WHERE 
                        u.npp_supervisor = $1
                    GROUP BY
                        e.id_users, u.nama, DATE(e.waktu);
`;
            values = [spv];
        } else {
            query = `SELECT
                        e.id_users AS id_user,
                        u.nama AS nama_user,
                        DATE(e.waktu) AS tanggal,
                        MAX(CASE WHEN e.type = 'IN' THEN e.waktu END) AS waktu_masuk,
                        MAX(CASE WHEN e.type = 'OUT' THEN e.waktu END) AS waktu_keluar,
                        CASE WHEN MAX(CASE WHEN e.type = 'IN' THEN e.is_approve END) = 0 THEN 'Reject' ELSE 'Approve' END AS status_masuk,
                        CASE WHEN MAX(CASE WHEN e.type = 'OUT' THEN e.is_approve END) = 0 THEN 'Reject'
                             WHEN MAX(CASE WHEN e.type = 'OUT' THEN e.is_approve END) = 1 THEN 'Approve'
                             ELSE '-' END AS status_keluar
                    FROM
                        app.epresence e
                    JOIN
                        app.users u ON e.id_users = u.id
                    GROUP BY
                        e.id_users, u.nama, DATE(e.waktu);
                    `;
            values = [];
        }

        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Meneruskan kesalahan ke panggilan berikutnya
    }
};

const insertNewPresence = async (body, accessToken) => {

    try {
        const user = await userModel.getTokenInfo(accessToken)
        console.log(user);
        let query, values;

        query = `INSERT INTO app.epresence(
                    id_users, type, is_approve, waktu
                    )VALUES(
                    $1,$2,$3,$4
                    )RETURNING *;`;
        values = [
            user.id,
            body.type,
            0,
            body.waktu
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error("Error inserting users:", error);
        throw error; // Meneruskan kesalahan ke panggilan berikutnya
    }
}

const updateApproval = async (body, id) => {
    try {
        let query, values;
        query = `UPDATE app.epresence SET is_approve = $1  WHERE id = $2`;
        values = [body.is_approve, id];
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error("Error updating presence:", error);
        throw error; // Meneruskan kesalahan ke panggilan berikutnya
    }
}
module.exports = { getAllPresence, insertNewPresence, updateApproval };
