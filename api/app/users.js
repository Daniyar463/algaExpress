const express = require('express');
const User = require('../models/User');
const TariffGroup = require("../models/TariffGroup");
const permit = require("../middleware/permit");
const auth = require("../middleware/auth");
const {nanoid} = require("nanoid");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;
const router = express.Router();

router.get('/', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const users = await User.find({role: 'user'})
            .select('name email');
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/notification', auth, permit('admin'), async (req, res) => {
    try {
        const notification = await User.findById(req.user._id)
            .select('notification');
        res.send(notification);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', async (req, res) => {
    try {

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).send({
                errors: {password: {message: "Пароли не совпадают"}},
            });
        }

        const tariff = await TariffGroup.findOne({new: {$exists: true}});
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            phone: {number: req.body.phone},
            name: req.body.name,
            role: req.body.role,
            tariff: {
                usa: tariff.new.usa,
                turkey: tariff.new.turkey,
                china: tariff.new.china,
                chinaGround: tariff.new.chinaGround,
            },
            group: 'NEW'
        });

        user.generateToken();
        await user.save();

        if (req.body?.creator === 'superAdmin') {
            return res.send({creator: req.body.creator});
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/notification', auth, permit('admin'), async (req, res) => {
    try {
        const notification = await User.findById(req.user._id);
        notification.notification = req.body.payload;

        notification.save({validateBeforeSave: false});
        res.send(notification.notification);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({message: 'Пожалуйста, введите корректный email-адрес или Пароль'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({message: 'Пожалуйста, введите корректный email-адрес или Пароль'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    user = await User.findOne({email: req.body.email})
        .select('token role name balance phone avatar group');

    res.send(user);
});

router.post('/forgot', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).send({message: 'Такая почта не найдена'})
        }
        const resetCode = nanoid(8);
        await User.findOneAndUpdate({email: user.email}, {resetCode});


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lbrtakun@gmail.com',
                pass: 'attractor19'
            }
        });

        const mailOptions = {
            from: 'lbrtakun@gmail.com',
            to: user.email,
            subject: 'Сброс пароля',
            html: `<p>Вы запросили сброс пароля на сайте alga-express</p>
                    <p>Код для сброса пароля: <b>${resetCode}</b></p>
                    <p>
                      <a href="http://localhost:3000/secret/reset-password">Перейдите по ссылке</a>
                      </p>`

        };

        await transporter.sendMail(mailOptions, function (error) {
            if (error) {
                return res.send({message: "Ошибка отправки"})
            } else {
                res.send({message: 'Код для сброса пароля был отправлен на ' + user.email});
            }
        });

    } catch (e) {
        res.status(500).send(e);
    }
});


router.post('/reset', async (req, res) => {
    try {
        const user = await User.find({resetCode: req.body.secretCode});
        if (!user) {
            console.log('error')
            return res.status(404).send({message: 'Неправильный код'})
        }
        const newPassword = req.body.password;

        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const password2 = await bcrypt.hash(newPassword, salt);

        await User.findOneAndUpdate({resetCode: req.body.secretCode}, {password: password2});
        res.send({message: " Пароль успешно изменен"});
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/change', auth, async (req, res) => {
    try {
        const user = await User.find({_id: req.user._id});
        if (!user) {
            console.log('error')
            return res.status(401).send({message: 'Доступ запрещен'})
        }
        const newPassword = req.body.password;

        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const password2 = await bcrypt.hash(newPassword, salt);

        await User.findOneAndUpdate({email: req.user.email}, {password: password2});
        res.send({message: " Пароль успешно изменен"});
    } catch (e) {
        res.status(500).send(e);
    }
})

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();

    await user.save({validateBeforeSave: false});

    return res.send(success);
});

module.exports = router;




















