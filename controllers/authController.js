const path = require('path');
const rootDir = require('../helpers/path');
const User = require('../models/User');
const { use } = require('../routes/user');
exports.getRegisterPage = (req, res) => {
    res.render(path.join(rootDir, 'views', 'register'), { title: 'Inscrivez-vous !' })
}
exports.getloginPage = (req, res) => {
    res.render(path.join(rootDir, 'views', 'login'), { title: 'Connectez-vous !' })
}

// Register
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

    });

    sendTokenresponse(user, 200, res)
};

// Login
exports.login = async(req, res, next) => {

    // console.log(req.body)
    const { email, password } = req.body
    console.log(email);
    console.log(password);
    // Validation de l'email et le password
    if (!email || !password) {
        console.log('email ou mdp vide'.blue)
        res.status(400).json({ success: false })
    }

    // Vérifier si l'email existe dans la bd
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        console.log('E-mail inexistant'.blue);
        res.status(401).json({ success: false })
    }

    // Verifier si le mot de passe est correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        console.log('Mot de passe incorect'.blue)
        res.status(401).json({ success: false })
    }

    sendTokenresponse(user, 200, res)
    console.log('User connected'.blue)

}
exports.getDashboardPAge = async(req, res, next) => {
    const user = User.findById(req.user.id)

    res
        .status(200)
        .json({
            success: true,
            data: user
        })
}
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

// Get token from model, create cookie and response
const sendTokenresponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });

}