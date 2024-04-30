const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')

const { Http2ServerRequest, Http2ServerResponse } = require('http2');

const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')
const epresenceRoutes = require('./routes/epresence')
const loginRoutes = require('./routes/login')

const app = express();
const port = 3100

dotenv.config()


app.use(cors({
    origin: '*'
}))

app.use(express.json());

app.use("", indexRoutes);
app.use("/users", usersRoutes);
app.use("/epresence", epresenceRoutes);
app.use("/login", loginRoutes);


app.listen(port, () => {
    console.log(`pegawai aApp berjalan di port ${port}`)
})