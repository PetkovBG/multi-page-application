const router = require('express').Router();

const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
        const { username, email, password, repeatPassword } = req.body;

        await authService.register(username, email, password, repeatPassword);
    
    res.redirect('/');
})

module.exports = router;