const pool = require('../../utils/db-connect')

module.exports = (Http2ServerRequest, Http2ServerResponse) => {

    const spv = Http2ServerRequest.query.spv

    if (spv != null) {
        pool.query(
            `SELECT * FROM app.users where npp_supervisor = $1`,
            [spv],
            (dbError, dbResponse) => {
                if (dbError) throw dbError

                Http2ServerResponse.json(dbResponse.rows)
            }
        )
    } else {
        pool.query(
            `SELECT * FROM app.users`,
            [],
            (dbError, dbResponse) => {
                if (dbError) throw dbError

                Http2ServerResponse.json(dbResponse.rows)
            }
        )
    }

}