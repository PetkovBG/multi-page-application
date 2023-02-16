const router = require('express').Router();
const cryptoService = require('../services/cryptoService');

const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const { getPaymentMethod } = require('../utils/viewDataUtils');

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
//GET details page
router.get('/:cryptoId/details', async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);
    
    console.log(crypto);

    const isOwner = crypto.owner == req.user._id;
    const isBuyer = crypto.buyers?.some(id => id == req.user?._id);


    res.render('crypto/details', {crypto, isOwner, isBuyer});
});

//Buy crypto
router.get('/:cryptoId/buy', async (req, res) => {

    const crypto = await cryptoService.buy(req.params.cryptoId, req.user._id);

    // console.log(crypto);

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

//GET edit page
router.get('/:cryptoId/edit', isAuth, async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const paymentMethods = getPaymentMethod(crypto.paymentMethod);
    console.log(paymentMethods);

    res.render('crypto/edit', {crypto, paymentMethods});
});

//POST edit page
router.post('/:cryptoId/edit', isAuth, async (req, res) => {

    const cryptoData = req.body;
    const cryptoId = req.params.cryptoId;

    await cryptoService.edit(cryptoData, cryptoId);


    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

//Delete page
router.get('/:cryptoId/delete', async (req, res) => {

    await cryptoService.delete(req.params.cryptoId);

    res.redirect('/crypto/catalog');
});

router.get('/search', async (req, res) => {

    const { name, paymentMethod } = req.query;

    let crypto = await cryptoService.search(name, paymentMethod);

    const paymentMethods = getPaymentMethod(paymentMethod);

    res.render('crypto/search', {crypto, paymentMethods, name, paymentMethod});
})



module.exports = router;