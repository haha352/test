const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Member = require('../models/members'); // Giả sử bạn đã định nghĩa model Member

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'Khanhdz123', {
        expiresIn: maxAge
    })
}
class UserController {
    // Render trang đăng ký
    // index(req, res) {
    //     res.render('register');
    // }

    // Render trang đăng nhập
    // login(req, res) {
    //     res.render('login');
    // }

    // Đăng ký người dùng mới
    // async register(req, res) {
    //     const { username, password } = req.body;
    //     console.log('Username:', username);
    //     console.log('Password:', password);
    //     let errors = [];

    //     // Check required fields
    //     if (!username || !password) {
    //         errors.push({ msg: 'Please enter all fields' });
    //     }

    //     // Check password length
    //     if (password.length < 6) {
    //         errors.push({ msg: 'Password must be at least 6 characters' });
    //     }

    //     // If there are errors, return 400 with errors
    //     if (errors.length > 0) {
    //         return res.status(400).json({ errors });
    //     }

    //     try {
    //         // Check if username already exists
    //         const user = await Member.findOne({ username });
    //         if (user) {
    //             return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });
    //         }

    //         // Create new user object
    //         const newUser = new Member({
    //             username,
    //             password
    //         });

    //         // Hash password
    //         newUser.password = await bcrypt.hash(password, 10);

    //         // Save user
    //         await newUser.save();
    //         res.status(201).json({ message: 'User registered successfully' });
    //         // Redirect to login page after successful registration
    //         res.redirect('/auth/login');
    //     } catch (err) {
    //         console.error('Error processing registration:', err);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // }


    // Xử lý đăng nhập người dùng
   // Xử lý đăng nhập người dùng
    async handleLogin(req, res) {
    try {
        const { username, password } = req.body;

        const existUsername = await Member.findOne({ username });
        if (!existUsername) {
            req.flash('error', 'Incorrect username or password');
            return res.redirect('/auth/login')
        }

        const auth = await bcrypt.compare(password, existUsername.password);
        if (auth) {

            const token = createToken(existUsername._id);

            // Set the token as a cookie
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });


            res.redirect('/home')
        } else {
            req.flash('error', 'Incorrect username or password');
            return res.redirect('/users/login')
        }
    } catch (error) {
        req.flash('error', 'Incorrect username or password');
        res.status(500).json({ message: 'Server error', error });
    }
}

}

module.exports = new UserController();
