const User = require('../models/utilisateur');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imgUrl: req.body.imgUrl,
        password: ''
    };
try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    User
    .findOne({email: userData.email})
    .then(data => {
        if(data) {
            res.json({message: 'Desolé le compte existe déjà!'});
        }else {
            userData.password = hash;
            const newUser = new User(userData);
            newUser
            .save()
            .then(user => {
                let token = jwt.sign(
                    {userId: user._id, email: user.email},
                    process.env.JWT_KEY,
                    {expiresIn: '200h'}
                );
                const userData = {
                    token,
                    user,
                    message: 'Votre compte a été bien créé',
                    expiresIn: 1728000000 
                };
                res.status(201).json({user: userData})
            }).catch(error => res.send('Une erreur est suvenus: '+error))
        }
    }).catch(error => res.send('Une erreur est suvenus: '+error))
    
} catch (error) {
    res.status(505).json({message: 'Une erreur est suvenus!'+ error})
}

}

exports.signin = (req, res) => {

    try {
        User
        .findOne({email: req.body.email})
        .then(user => {
            if (user) {
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const token = jwt.sign(
                        {userId: user._id, email: user.email},
                        process.env.JWT_KEY,
                        {expiresIn: '200h'}
                    );
                    const userData = {
                        token,
                        user,
                        message: 'vous etes bien connecté!',
                        expiresIn: 1728000000
                    }
                    res.json({user: userData});
                }else {
                    res.json({message: 'mot de passe incorrect!'});
                }
            } else {
                res.json({message: "Le compte n'existe pas!"});
            }
        }).catch(error => res.json({message: 'Une erreur est survenus: '+error}))
    } catch (error) {
        res.json({message: 'Une erreur est survenus!'});
    }
}

exports.getAllUser = (req, res) => {
    res.send('Bonjour tous les monde');
}