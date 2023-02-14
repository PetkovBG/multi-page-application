const User = require('../models/User');

exports.register = async (username, email, password, repeatPassword) => {

    if(password == '') {
        throw new Error('Password minimum lenght is 4')
    }

    if (password !== repeatPassword) {
        throw new Error ('Password mismatch');
    }

    const existingUser = await User.findOne({
        $or: [
            {email},
            {username},
        ]
    });

    if (existingUer) {
        throw new Error('User already exists')
    }

    

}