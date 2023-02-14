const User = require('../models/User');

const bcrypt = require('bcrypt')

exports.findByEmail = (email) => User.findOne(email);

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

};

exports.login = async (email, password) => {

    const user = this.findByEmail(email);

    if(!user) {
        throw new Error('Username or password is not valid')
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error('Username or password is not valid')
    }

    

}