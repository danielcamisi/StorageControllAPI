const peace = require("../models/peaceModel");

exports.create = async (req, res) => {
  const { pName,desc,details,price,img} = req.body;

  if (!pName) {
    return res.status(422).json({ msg: "verifique o campo Nome do carro" });
  }
  if (!details) {
    return res.status(422).json({ msg: "verifique o campo Ano de Fabricação" });
  }
  if (!price) {
    return res.status(422).json({ msg: "verifique o campo de Preço" });
  }
  if (!desc) {
    return res.status(422).json({ msg: "verifique o campo de Descrição" });
  }
   if (!img) {
    return res.status(422).json({ msg: "Pelo menos uma imagem deve ser publicada" });
  }

  try {
    const newPeacePost = new car({ pName, details, price, desc });
    await newPeacePost.save();
    res.status(201).json(newPeacePost);
    console.log(newPeacePost);
  } catch (error) {
    return res.status(422).json({ msg: "Erro ao anunciar a peça", error });
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
  try {
    const peacePosts = await peace.find();
    if (!peacePosts || peacePosts.length === 0) {
      return res.status(404).json({ msg: "Nenhuma peça encontrada" });
    }
    res.status(200).json(peacePosts);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao buscar as peças", error });
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
