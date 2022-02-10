const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const Buyout = require("../models/Buyout");
const auth = require("../middleware/auth");
const dayjs = require("dayjs");
const permit = require("../middleware/permit");



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', auth, permit('admin','user'),async (req, res) => {
    try {

        if (req.user.role === 'user'){
            const selfBuyouts = await Buyout.find({user: req.user._id}).populate('user', 'name ');
            res.send({data:selfBuyouts});
        } else{
            const buyouts = await Buyout.find({deleted: {$ne : true}}).populate('user', 'name');
            res.send({total: buyouts.length, data: buyouts});
        }

    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', auth, permit('admin','user'),async (req, res) => {
    try {

        if (req.user.role === 'user'){
            const selfBuyout = await Buyout.find({user: req.user._id, _id: req.params.id}).populate('user', 'name ');
            res.send(selfBuyout);
        } else{
            const buyout = await Buyout.find({_id: req.params.id,deleted: {$ne : true}}).populate('user', 'name');
            res.send(buyout);
        }

    } catch (e) {
        res.sendStatus(500);
    }
});




router.post('/', auth ,upload.single('image'), async (req, res) => {
    try {
        const buyoutData = {
            description: req.body.description,
            url: req.body.url,
            datetime:dayjs().format('DD/MM/YYYY'),
            user: req.user._id,
            country: req.body.country,
            price: req.body.price,
        };

        if(req.file){
            buyoutData.image =  'uploads/buyouts/' + req.file.filename;
        }

        const buyout = new Buyout(buyoutData);
        await buyout.save();
        res.send(buyout);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, permit('admin'),async (req, res) => {
    try {
        const buyout = await Buyout.findById(req.params.id);

        if (Object.keys(buyout).length === 0) {
            return res.status(404).send({error: `Выкуп с ID=${req.params.id} не найден.`});
        } else {
            buyout.deleted = true;
            await buyout.save();
            return  res.send({message: `Выкуп успешно удален.`})
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put('/:id', auth, upload.single('image'),permit('admin', 'user'),async (req, res) => {
    try {
        console.log(req.body);

        if(req.user.role === 'admin') {
            const updatedPrice = await Buyout.findByIdAndUpdate(req.params.id, {
                description: req.body.description,
                url: req.body.url,
                country: req.body.country,
                price: req.body.price,
            }, {new: true, runValidators: true});

            res.send(updatedPrice);
        }
         else if (req.user.role === 'user'){
                 const newObj = {
                     description: req.body.description,
                     url: req.body.url,
                     datetime:dayjs().format('DD/MM/YYYY'),
                     country: req.body.country,
                 }
                 if(req.file){
                     newObj.image ='uploads/buyouts/' + req.file.filename;
                 }
                 const updatedBuyout = await Buyout.findByIdAndUpdate(req.params.id, {newObj}, {new: true, runValidators: true});

                 res.send(updatedBuyout);

        }

    } catch(error) {
        res.status(400).send(error);
    }
});


module.exports = router;