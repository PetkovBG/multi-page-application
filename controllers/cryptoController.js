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

//GET crypto catalog
router.get('/catalog', async (req, res) => {

    const crypto = await cryptoService.getAll();


    res.render('crypto/catalog', {crypto});
});

router.get('/:cryptoId/details', async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const isOwner = crypto.owner == req.user._id;
    const isBuyer = crypto.buyers?.some(id => id == req.user?.id);

    // console.log(crypto);

    res.render('crypto/details', {crypto, isOwner, isBuyer});
})

module.exports = router;