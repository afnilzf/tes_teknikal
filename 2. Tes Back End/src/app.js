const express = require('express');
const OAuth2Server = require('oauth2-server');
const cors = require('cors');
const dotenv = require('dotenv')

const usersRoutes = require('./routes/users')
const presenceRoutes = require('./routes/presence')
const modelOauth = require('./models/oauth');

const app = express();
const port = 3100

dotenv.config()

//middleware
app.use((req, res, next) => {
    console.log("res terjadi")
    next();
})


const oauthServer = new OAuth2Server({
    model: modelOauth,
});

// Middleware express untuk mendapatkan informasi token akses dari permintaan
app.use(async (req, res, next) => {
    req.oauth = {
        server: oauthServer,
    };
    next();
});

app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//router
app.use("/users", usersRoutes);
app.use("/epresence", presenceRoutes);


app.listen(port, () => {
    console.log(`pegawai app berjalan di port ${port}`)
})