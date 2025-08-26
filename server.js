require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/myRoutes');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
require('./config/config');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res)=>{
    res.status(200).send("StorageManager API - JDM cars");
})

app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

  
