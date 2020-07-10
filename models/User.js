const mongoose = require('mongoose');
const { sign } = require('jsonwebtoken');
bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Veuillez entrer votre prénom'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Veuillez entrer votre nom'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Veuillez entrer votre adresse E-mail'],
        unique: [true, 'Cet E-mail est déjà utilisé pour un compte'],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Veuiilez entrer une adresse E-mail correcte'
        ],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Veuillez entrer votre mot de passe'],
        trim: true,
        select: false,
        minlength: [8, 'Votre mot de passe doit avoir au moins 8 caractères']
    },
    resetPassordToken: String,
    resetPasswordExpire: Date,
    birthDay: {
        type: Date,
        required: [true, 'Veuillez entrer votre date de naissance']
    },
    niveau: [{
        niveauEtude: {
            type: String,
            enum: [
                'LICENSE 1/FIP 1',
                'LICENSE 2/FIP 2',
                'LICENSE 3',
                'MASTER 1',
                'MASTER 2',
                'DOCTORAT'
            ],
            require: [true, 'Veuillez Choisir votre noveau d\'étude']
        },
        filiere: {
            type: String,
            enum: [
                'ECONOMIE',
                'FINANCE',
                'GESTION',
            ],
            require: [true, 'Veuillez choisir votre filière']
        },
        specialite: {
            type: String,
            enum: [
                'MARKETING',
                'GESTION DES RESSOURCES HUMAINES',
                'COMPTA-GESTION CONTROLE',
                'FINANCE/COMPTA-GESTION CONTROLE',
                'FINANCE',
                'ECONOMIE NUMERIQUE',
                'ECONOMIE INTERNATIONALE',
                'ECONOMIE DE DEVELOPPEMENT',
                'ECONOMIE DU TRAVAIL',
                'ECONOMIE AGRICOLE',
                'COMPTABILITE DES ENTREPRISES',
                'FINANCE PUBLIQUE',
                'BANQUE ET ASSURANCE',
                'COMPTABILITE PUBLIQUE'
            ],
            require: [true, 'Veuillez choisir votre spécialité']
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});
// Encrypt pasword using bcrypt
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
// sign JsonWebToken and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};

// Match user entered password with password hashed
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', UserSchema);