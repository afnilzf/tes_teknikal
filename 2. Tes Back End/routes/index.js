const express = require('express');
const router = express.Router()

router.get('/', (Http2ServerRequest, Http2ServerResponse) => {
    Http2ServerResponse.json({
        helo: "Heloo Duniaa"
    });
})

module.exports = router;