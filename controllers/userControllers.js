const user = require("../models/models");

exports.create = async (req, res) => {
  const { name } = req.body;
  const { nUser } = req.body;
  const { pword } = req.body;
  const { confirmPword } = req.body;
  const { email } = req.body;

  if (!nUser) {
    return res
      .status(422)
      .json({ msg: "o campo NOME DE USUÁRIO é obrigatório" });
  }
  if (!name) {
    return res.status(422).json({ msg: "o campo NOME é obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O campo EMAIL é obrigatório! " });
  }
  if (!pword) {
    return res.status(422).json({ msg: "O campo SENHA é obrigatório! " });
  }
  if (pword != confirmPword) {
    return res.status(422).json({ msg: "As senhas devem ser iguais! " });
  }

  const userExists = await model.findOne({ email: email });

  if (userExists) {
    return res.status(301).json({ msg: "Usuário Existente!" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(pword, salt);

  const newUser = new model({
    name,
    email,
    pword: passwordHash,
  });

  try {
    await newUser.save();
    return res.status(201).json({ msg: "Usuário Criado! :) " });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao efetuar o Login!" });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { editUser, email, pword, name } = req.body;

  try {
    const editProfile = await user.findByIdAndUpdate(
      id,
      { name, email, pword, editUser },
      { new: true }
    );
  } catch (error) {
    return res
      .status(404)
      .json({ erro: "Não foi possível alterar os dados do seu perfil" });
  }
};
