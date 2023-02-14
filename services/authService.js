const User = require('../models/User');

const bcrypt = require('bcrypt')

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

    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({username, email, password: hashedPassword});

}