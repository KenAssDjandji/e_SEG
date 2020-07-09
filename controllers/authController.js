const path = require('path');
const rootDir = require('../helpers/path');
const User = require('../models/User');
exports.getRegisterPage = (req, res) => {
    res.render(path.join(rootDir, 'views', 'register'), { title: 'Inscrivez-vous !' })
}
exports.createUser = async(req, res, next) => {
    // let birthDayModified = new Date(req.body.birthDay).toISOString().slice(0, 10);
    const { firstname, lastname, email, birthDay, niveauEtude, filiere, specialite, password, passwordConfirm } = req.body
    console.log(req.body);
    // console.log(new Date(req.body.birthDay).toISOString().slice(0, 10).replace('T', ' '));
    const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        birthDay: new Date(birthDay),
        niveau: {
            niveauEtude: niveauEtude,
            filiere: filiere,
            specialite: specialite,
        },
        resetPassordToken: 'odihgodihgodighqLKHOEIHQLDFKHOI',
        resetPasswordExpire: Date.now() + 600000

    });

    res.status(201).json({
        success: true,
        data: user
    })
};
exports.getAllUser = async(req, res, next) => {
    try {
        const users = await User.find();
        // const age = Math.round((Date.now() - users[0].birthDay) / 1000 / 3600 / 24 / 365)
        // console.log(age)
        res.status(300).json({ success: true, data: users })
    } catch (err) {
        res.status(400).json({ success: false })
    }
};
exports.getUser = async(req, res, next) => {
    try {
        let id = req.params.id;
        // console.log(id);
        const user = await User.findOne({ _id: id });
        // console.log(user);
        if (!user) {
            console.log(`user not found !!`)
            res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })

    } catch (err) {
        console.log(err);
        // res.status(400).json({ success: false })
        next(err)
    }
}

exports.deleteUser = async(req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.remove({ _id: id })
        if (!user) {
            console.log(`Error to remove user`)
            res.status(400).json({ success: false })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
}