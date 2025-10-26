const express = require('express');
const obatRouter = require('../src/routes/obatRouter');
const app = express();
const PORT = 4000;
const log = require("./middleware/log");
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

app.use(express.json());
app.use(log);

app.get('/', (req, res) => {
    res.send('API Obat Berjalan!!!');
});

app.post('/tambah_obat', (req, res) => {
    const namaObat = req.body.nama_obat
    console.log("Menambahkan Obat: " + namaObat)
    res.json("Berhasil menambahkan Obat: " + namaObat)
});

app.use('/obat', obatRouter);

app.listen(PORT, () => {
    console.log(`App port http://localhost:${PORT}`);
});

app.use(notFoundHandler);
app.use(errorHandler);
