const peace = require("../models/peaceModel");
const mongoose =require("mongoose")

exports.create = async (req, res) => {
   if (!req.file) {
    return res.status(400).json({ msg: "Nenhuma imagem foi enviada." });
  }
  const { announceName, year,details,price, desc } = req.body;
  const img = `/uploads/${req.file.filename}`;
  const userId = req.userId; 

  if (!announceName) {
    return res.status(422).json({ msg: "verifique o campo Nome do peça" });
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
    const peacePost = new peace({ announceName, year, details, price, desc, img, userId });
    await peacePost.save();
    res.status(201).json(peacePost);
    console.log(peacePost);
  } catch (error) {
    return res.status(422).json({ msg: "Erro ao anunciar esta Peça", error: error.message });
  }
};

exports.getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const peacePost = await peace.findById(id);
    if (!peacePost) {
      return res.status(404).json({ msg: "Peça não encontrada" });
    }
    res.status(200).json(peacePost);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao buscar a peça", error });
  }
};

exports.getAll = async (req, res) => {
  console.log("=== DEBUG getAll PEACE ===");
  console.log("Rota /peace/list foi chamada");
  
  try {
    console.log("Tentando buscar peças no banco...");
    const peacePosts = await peace.find();
    console.log("Resultado da busca:", peacePosts);
    console.log("Quantidade encontrada:", peacePosts ? peacePosts.length : 0);
    
    if (!peacePosts || peacePosts.length === 0) {
      console.log("Nenhuma peça encontrada, retornando 404");
      return res.status(404).json({ msg: "Nenhuma peça encontrada" });
    }
    
    console.log("Retornando peças encontradas");
    res.status(200).json(peacePosts);
  } catch (error) {
    console.error("Erro no getAll:", error);
    return res.status(500).json({ msg: "Erro ao buscar as peças", error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { pName } = req.body;
  const { desc } = req.body;
  const { details } = req.body;
  const { price } = req.body;
  try {
    if (!pName || !desc || !details || !price) {
      return res.status(422).json({ msg: "verifique os campos" });
    }
    const peacePosted = await peace.findByIdAndUpdate(
      id,
      { pName, desc, details, price },
      { new: true }
    );
    if (!peacePosted) {
      return res.status(404).json("Anúncio de peça Não encontrado");
    }
    res.json(peacePosted);
  } catch (error) {
    return res.status(422).json({ msg: "Houve um erro ao atualizar", error });
  }
};


exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const peaceDeleted = await peace.findByIdAndDelete(id);
    if (!peaceDeleted) {
      return res.status(404).json({ msg: "Peça não encontrada" });
    }

    res.status(200).json({ msg: "Peça deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao deletar a peça", error });
  }
};

exports.getOneByIdPeace = async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).json({ msg: "ID do usuário não informado." });

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "ID do usuário inválido" });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const myAnnounces = await peace.find({ userId: userObjectId });
    return res.json(myAnnounces);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao encontrar os Anúncios", error });
  }
};