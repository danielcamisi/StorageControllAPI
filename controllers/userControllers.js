const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.create = async (req, res) => {
console.log("Dados recebidos:", req.body);

  const { name, nUser, pword, confirmPword, email } = req.body;
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

  const userExists = await user.findOne({ email: email });

  if (userExists) {
    return res.status(301).json({ msg: "Usuário Existente!" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(pword, salt);

  const newUser = new user({
    name,
    nUser,
    email,
    pword: passwordHash,
  });

  try {
    await newUser.save();

    const para = email;
    const assunto = "Bem-vindo ao JDM Motors!";
    const texto = `Olá ${name}, seu cadastro foi realizado com sucesso!`;
    const html = `<h2>Olá ${name},</h2><p>Seu cadastro foi realizado com sucesso no JDM Motors!</p>`;

    const transportador = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transportador.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: para,
      subject: assunto,
      text: texto,
      html: html,
    });

    return res.status(201).json({ msg: "Usuário Criado! :) " , info});
  } catch (error) {
   return res.status(500).json({ error: "Erro ao efetuar o Cadastro!" });
  }
};


exports.update = async (req, res) => {
  const { id } = req.params;
  const { nUser, pword, name } = req.body;

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(pword, salt);

  try {
    const editProfile = await user.findByIdAndUpdate(
      id,
      { name, 
        pword: passwordHash, 
        nUser },
      { new: true }
    );
    res.json(editProfile);

    await transportador.sendMail({
      //função de envio de e-mail, após realizar o cadastro
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Mudança dos dados Cadastrais (JDM Motors)",
      text: `Olá ${nome}, dados cadastrais alterados com sucesso!`,
      html: `<h2>Olá ${nome},</h2><p>dados cadastrais alterados com sucesso!</p>`,
    });
    const info = await transportador.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "teste",
      text: "teste",
      html:`<h2>Olá ${nome},</h2><p>dados cadastrais alterados com sucesso!</p>`,
    });

        
    return res
      .status(200)
      .json({ msg: "Usuário Alterado e E-mail enviado com sucesso!", info });
  } catch (error) {
     return res.status(500).json({ error: "Erro interno" });
  }
};

exports.login = async (req, res) => {
  const { email, pword } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O campo EMAIL é obrigatório! " });
  }
  if (!pword) {
    return res.status(422).json({ msg: "O campo SENHA é obrigatório! " });
  }

  const userExists = await user.findOne({ email: email });

  if (!userExists) {
    return res.status(422).json({ msg: "Faça um cadastro! " });
  }

  const validate = await bcrypt.compare(pword, userExists.pword);

  if (!validate) {
    return res.status(422).json({ msg: "Senha incorreta!" });
  }

  try {
    const segredo = process.env.SECRET;

    if (!segredo) {
      return res.status(422).json({ msg: "Vazio!" });
    }
    const token = jwt.sign(
      {
        id: userExists._id,
      },
      segredo
    );
    res.status(200).json({ msg: "Autenticação Realizada", token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const userDetails = await user.find();
     if (!userDetails || userDetails.length === 0) {
      return res.status(404).json({ msg: "Não foi encontrado nenhum usuário" });
    }
    return res.status(200).json({
      msg: "Estes são todos os usuários do Banco de Dados",
      allusers: userDetails,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar os usuários", error });
  }
};
