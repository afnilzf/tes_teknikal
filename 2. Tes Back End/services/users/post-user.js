const bcrypt = require('bcryptjs')

const pool = require('../../utils/db-connect')

module.exports = (Http2ServerRequest, Http2ServerResponse) => {

    // const hashPassword = Http2ServerRequest.body.spv
    const hashPassword = bcrypt.hashSync(Http2ServerRequest.body.passwrd, 8)
    pool.query(
        `INSERT INTO app.users(
            nama, email, npp, npp_supervisor, passwrd, level
        )VALUES(
            $1,$2,$3,$4,$5,$6
        )`,
        [
            Http2ServerRequest.body.name,
            Http2ServerRequest.body.email,
            Http2ServerRequest.body.npp,
            Http2ServerRequest.body.npp_supervisor,
            hashPassword,
            Http2ServerRequest.body.level,
        ],
        (dbError, dbResponse) => {
            if (dbError) throw dbError

            Http2ServerResponse.json(dbResponse.rows)
        }
    )

}