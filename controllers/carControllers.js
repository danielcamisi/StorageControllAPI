const car = require("../models/models");

exports.create = async (req,res) => {
    const {carName} = req.body;
    const {year} = req.body;
    const {model} = req.body;
    const {price} = req.body;

    try{
        if (!carName){
            return res.status(422).json({ msg: "verifique os campos" });
        }
        if(!year){
            return res.status(422).json({ msg: "verifique os campos" });
        }
        if(!model){
            return res.status(422).json({ msg: "verifique os campos" });
        }
        if(!price){
            return res.status(422).json({ msg: "verifique os campos" });
        }
    } catch(error){
        return res.status(422).json({ msg: "Erro ao anunciar o carro" });
    }

}
