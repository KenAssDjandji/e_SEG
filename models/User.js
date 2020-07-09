const mongoose = require('mongoose');

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
// UserSchema.pre('save', function preSave(next) {
//     let user = this;
//     user.birthDay()
// })

module.exports = mongoose.model('User', UserSchema);