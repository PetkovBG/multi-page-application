const jwt = require('../lib/jsonwebtoken');

const { SECRET } = require('../constants');

//isAuthenticated middleware
exports.authentication = async (req, res, next) => {

const token = req.cookies['auth'];

if (token) {

    try {   
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;

        res.locals.isAuthenticated = true;
        res.locals.user = decodedToken;

    } catch (error) {
        res.clearCookie('auth');
        return res.status(401).redirect('home/404');
    }

    
}
next();

};

//isAuthroized middleware
exports.isAuth = (req, res, next) => {

    if(!req.user) {
        res.redirect('/login')
    }
    next();
}