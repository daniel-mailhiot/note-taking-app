import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Show register page
export function showRegisterPage(req, res) {
    res.render('auth/register', {
        title: 'Register',
        error: null,
        formData: {
            username: '',
        }
    });
}

// Show login page
export function showLoginPage(req, res) {
    res.render('auth/login', {
        title: 'Login',
        error: null,
        formData: { username: '' }
    });
}

// Handle registration form submission
export async function registerUser(req, res) {
    try {
        const username = req.body.username.trim();
        const password = req.body.password;

        // Server-side input validation
        if (!username || !password) {
            return res.status(400).render('auth/register', {
                title: 'Register',
                error: 'Username and password are required',
                formData: { username }
            });
        }

        if (password.length < 6) {
            return res.status(400).render('auth/register', {
                title: 'Register',
                error: 'Password must be at least 6 characters',
                formData: { username }
            });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).render('auth/register', { // using status 409 conflict for duplicate
                title: 'Register',
                error: 'Username already taken',
                formData: { username }
            });
        }

        // Hash the password with bcrypt before saving
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10; // read salt rounds from env, default to 10
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser =  await User.create({
            username,
            passwordHash
        });

        // Save user identity in session so they stay logged in
        req.session.userId = newUser._id.toString();
        req.session.username = newUser.username;

        return res.redirect('/notes'); 
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).render('auth/register', {
                title: 'Register',
                error: 'Something went wrong while creating your account.',
                formData: { username: req.body.username.trim() || '' }
            });
        }
    }

// Handle login form submission
export async function loginUser(req, res) {
    try {
        const username = req.body.username.trim();
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).render('auth/login', {
                title: 'Login',
                error: 'Username and password are required',
                formData: { username: username || '' }
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).render('auth/login', {
                title: 'Login',
                error: 'Invalid username or password',
                formData: { username }
            });
        }

        // Compare the provided password to the stored bcrypt hash
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatch) {
            return res.status(401).render('auth/login', {
                title: 'Login',
                error: 'Invalid username or password',
                formData: { username }
            });
        }
        // When login is successful, store user info in session
        req.session.userId = user._id.toString();
        req.session.username = user.username;

        return res.redirect('/notes');
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).render('auth/login', {
                title: 'Login',
                error: 'Something went wrong while logging in.',
                formData: { username: req.body.username.trim() || '' }
            });
    }
}

// Handle logout
export function logoutUser(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.error('Error destroying session during logout:', error);
            return res.status(500).send('Failed to log out');
        }

        // Remove session cookie in browser
        res.clearCookie('connect.sid');
        return res.redirect('/auth/login');
    });
}

/*
Note to self 
bcrypt docs:
https://www.npmjs.com/package/bcrypt

express-session docs:
https://expressjs.com/en/resources/middleware/session.html

All HTTP response status codes:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
*/