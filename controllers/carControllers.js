const car = require("../models/postCarModel");

exports.create = async (req, res) => {
   if (!req.file) {
    return res.status(400).json({ msg: "Nenhuma imagem foi enviada." });
  }
  const { announceName, year,details,price, desc } = req.body;
  const img = req.file.path;
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
    res.send({ msg: "A rota CARROS foi consultada. Segue os resultados: ", Allcars: carDetails });
    res.status(200).json(carDetails)
    console.log(carDetails);
  } catch (error) {
    res.status(500).json({msg: "Erro ao buscar os carros" , error });
  }
};
