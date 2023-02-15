const router = require('express').Router();

const authService = require('../services/authService');

//Register
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
        const { username, email, password, repeatPassword } = req.body;


       const token = await authService.register(username, email, password, repeatPassword);
       res.cookie('auth', token);
       res.redirect('/');

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
        throw new Error(error.message)
    }
   
});

// Logout
router.get('/logout', (req, res) => {

    res.clearCookie('auth');

    res.redirect('/')
});

module.exports = router;