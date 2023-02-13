const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
        const { username, email, password, repeatPassword } = req.body;

        
    
    res.render('/')
})

module.exports = router;