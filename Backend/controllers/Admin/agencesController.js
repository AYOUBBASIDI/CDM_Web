const Agence = require('../../models/agenceModel.js');

const getAllAgences = async (req, res) => {
    try {
        const agences = await Agence.find();
        res.json(agences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const newAgence = async (req, res) => {
    const agence = new Agence({
        nom: req.body.nom,
        adresse: req.body.adresse,
        tel: req.body.tel,
        email: req.body.email,
        ville: req.body.ville,
    });
    try {
        const newAgence = await agence.save();
        res.status(201).json(newAgence);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
    

module.exports = { getAllAgences , newAgence };
