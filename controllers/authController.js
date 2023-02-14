const router = require('express').Router();

const authService = require()

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
        const { username, email, password, repeatPassword } = req.body;

        
    
    res.render('/')
})

module.exports = router;