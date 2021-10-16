const News = require('../models/news');



exports.addNews = async (req, res) => {
    const userId = '616a1d22dbfd0ac994f4e698';
    const news = {
        titre: req.body.titre,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        userId: userId
    }
    try {
        const newNews = await new News(news);
        await newNews.save();
        res.json({message: 'Votre news a été bien créé!'})
    } catch (error) {
        res.status(404).json({message: "Une erreur est survenus: "+error});
        console.log(error);
    }
}

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        news
        .populate('userId')
        .populate({path: 'commentaire', populate: 'userId'})
        .populate({path: 'avis', populate: 'userId'})
        .then(data => {
            res.status(201).json({news: data});
        }).catch(error => res.json({message: "Une erreur est survenus: "+error}))
    } catch (error) {
        res.status(404).json({message: "Une erreur est survenus!"});
    }
}
exports.getNewsById = async (req, res) => {
    const newsId = '';
    try {
        const news = await News.findById(newsId);
        news
        .populate('userId')
        .populate({path: 'commentaire', populate: 'userId'})
        .populate({path: 'avis', populate: 'userId'})
        .then(data => {
            res.status(201).json({news: data});
        }).catch(error => res.json({message: "Une erreur est survenus: "+error}))
    } catch (error) {
        res.status(404).json({message: "Une erreur est survenus!"});
    }
}
exports.getNewsByUser = async (req, res) => {
    const userId = '616a06502b979598633951eb';
    try {
        const news = await News.find({userId: userId});
        news
        .populate({path: 'commentaire', populate: 'userId'})
        .populate({path: 'avis', populate: 'userId'})
        .then(data => {
            res.status(201).json({news: data});
        }).catch(error => res.json({message: "Une erreur est survenus: "+error}))
    } catch (error) {
        res.status(404).json({message: "Une erreur est survenus!"});
    }
}
exports.addComment = async (req, res) => {
    const userId = '616a06502b979598633951eb';
    const newsId = '';
    const commentaire = {
        description: req.body.description,
        userId
    };
    try {
        const news = await News.findById(newsId);
        if (news) {
           await news.commentaire.push(commentaire);
           await news.save();
           res.json({message: 'Votre commentaire a été bien enregistré!'});
        } else {
            res.json({message: "Une erreur est survenus!"});
        }
    } catch (error) {
        res.status(404).json({message: "Une erreur est survenus!"});
    }
}
exports.addAvis = async (req, res) => {
    const userId = '616a06502b979598633951eb';
    const newsId = '';
    const avis = {
        reaction: req.body.reaction,
        userId
    }
    try {
        const news = await News.findById(newsId);
        if (news) {
            await news.avis.push(avis);
            await news.save();
            res.json({message: 'Vous venez d\'aimer ce news!'});
        } else {
            res.json({message: "Une erreur est survenus!"});
        } 
    } catch (error) {
        res.status(404).json({message: "Une erreur est survenus!"});   
    }
}

exports.addCommentAvis = async (req, res) => {

    const userId = '616a06502b979598633951eb';
    const newsId = '';
    const commentId = '';
    const avis = {
        reaction: req.body.reaction,
        userId
    }
    try {
        const news = await News.findById();
        if (news) {
            await news.commentaire.push(commentaire);
            const item = news.commentaire.find(el => el._id == commentId);
            await news.save();
            res.json({message: 'Vous venez d\'aimer ce news!'});
        } else {
            res.json({message: "Une erreur est survenus!"});
        } 
    } catch (error) {
        res.status(404).json({message: "Une erreur est survenus!"});
    }
}