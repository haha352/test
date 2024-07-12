const jwt = require('jsonwebtoken')
const Member = require('../models/members')
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    //check jsonwebtoken
    if (token) {
        jwt.verify(token, 'Tanty123', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/auth/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/auth/login');
    }
}

const checkMember = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'Tanty123', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await Member.findById(decodedToken.id);
                console.log('User:', user);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};


module.exports = { requireAuth, checkMember }