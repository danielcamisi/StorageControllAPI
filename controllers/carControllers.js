const car = require("../models/postCarModel");
const mongoose =require("mongoose");

exports.create = async (req, res) => {
   if (!req.file) {
    return res.status(400).json({ msg: "Nenhuma imagem foi enviada." });
  }
  const { announceName, year,details,price, desc } = req.body;
  const img = `/uploads/${req.file.filename}`;
  const userId = req.userId; 

  if (!announceName) {
    return res.status(422).json({ msg: "verifique o campo Nome do carro" });
  }
  if (!year) {
    return res.status(422).json({ msg: "verifique o campo Ano de Fabricação" });
  }
  if (!details) {
    return res.status(422).json({ msg: "verifique o campo Modelo" });
  }
  if (!price) {
    return res.status(422).json({ msg: "verifique o campo de Preço" });
  }
  if (!desc) {
    return res.status(422).json({ msg: "verifique o campo de Descrição" });
  }

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    const newCarPost = new car({ announceName, year, details, price, desc, img, userId });
    await newCarPost.save();
    res.status(201).json(newCarPost);
    console.log(newCarPost);
  } catch (error) {
    return res.status(422).json({ msg: "Erro ao anunciar o carro", error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { carName } = req.body;
  const { model } = req.body;
  const { desc } = req.body;

  try {
    if (!carName) {
      return res.status(422).json({ msg: "verifique os campos" });
    }
    if (!model) {
      return res.status(422).json({ msg: "verifique os campos" });
    }
    if (!desc) {
      return res.status(422).json( { msg: "verifique os campos" });
    }
    const carPosted = await car.findByIdAndUpdate(
      id,
      { desc, model, carName },
      { new: true }
    );
    if (!carPosted) {
      return res.status(404).json("Anúncio de carro Não encontrado");
    }
    res.json(carPosted);
  } catch (error) {
    return res.status(422).json({ msg: "Houve um erro ao atualizar" });
  }
};

exports.getOne = async(req,res)=>{
  const { carName } = req.body;

  if (!carName) {
    return res.status(422).json({ msg: "verifique o campo Nome do carro" });
  }

  try{
    const carFinded = await car.findOne(
     {carName} 
    )
    if (!carFinded) {
      return res.status(404).json("Anúncio de carro Não encontrado");
    }

    res.json(carFinded)

  }catch(error){
    return res.status(422).json({ msg: `Houve um erro ao buscar o carro ${carName}` });
  }
}


exports.getAll = async (req, res) => {
  try {
    const carDetails = await car.find();
    if(!carDetails){
      res.send({msg:"Não foi encontrado nenhum carro"})
    }
    res.status(200).json(carDetails);
  } catch (error) {
    res.status(500).json({msg: "Erro ao buscar os carros" , error });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const carAnounce = await peace.findByIdAndDelete(id);
    if (!carAnounce) {
      return res.status(404).json({ msg: "Anúncio não encontrado" });
    }

    res.status(200).json({ msg: "Anúncio deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao deletar o Anúncio", error });
  }
};


exports.getOneByUserID = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ msg: "ID do usuário não informado." });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "ID do usuário inválido." });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const myAnnounces = await car.find({ userId: userObjectId });

    return res.json(myAnnounces);
  } catch (error) {
    console.error("Erro no servidor:", error);
    return res.status(500).json({ msg: "Erro encontrar os Anúncios", error });
  }
};
