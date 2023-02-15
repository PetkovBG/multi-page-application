const router = require('express').Router();

const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');

//Register
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
        const { username, email, password, repeatPassword } = req.body;

    try {
        const token = await authService.register(username, email, password, repeatPassword);
        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
            res.status(404).render('auth/register', {error: getErrorMessage(error)})
    }

});

//Login
router.get('/login', (req, res) => {

    res.render('auth/login')
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    
    try {
    const token = await authService.login(email, password);
    res.cookie('auth', token);
    res.redirect('/');
    } catch (error) {
        res.status(404).render('auth/login', {error: getErrorMessage(error)})
    }
   
});

// Logout
router.get('/logout', (req, res) => {

    res.clearCookie('auth');

    res.redirect('/')
});

module.exports = router;