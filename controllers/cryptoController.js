const router = require('express').Router();
const cryptoService = require('../services/cryptoService');

const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

//GET create crypto
router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

//POST create crypto
router.post('/create', isAuth, async(req, res) => {

    const cryptoData = req.body;
    const ownerId = req.user._id;
    try {
        await cryptoService.create(ownerId, cryptoData);
        res.redirect('/crypto/catalog');
    } catch (error) {
        return res.status(400).render('crypto/create', {error: getErrorMessage(error)});
    }

});

module.exports = router;