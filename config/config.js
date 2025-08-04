const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPword = process.env.DB_PASSWORD;

async function main(){
    await mongoose.connect(
         `mongodb+srv://${dbUser}:${dbPword}@cluster0.uehse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    console.log("CONECTOU COM SUCESSO! - Conexão com o Banco de dados Efetuada com Sucesso")
}

main().catch((err)=> console.log(err));

module.exports = main;
