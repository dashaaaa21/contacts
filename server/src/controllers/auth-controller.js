const bcrypt = require('bcrypt');

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c228a04e-823d-457a-8d70-68f40b99119b', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'register-entry',
        hypothesisId: 'H4',
        location: 'auth-controller.js:register',
        message: 'Register called',
        data: { hasEmail: Boolean(email), hasPassword: Boolean(password) },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log

    const noEmail = !email;
    const noPassword = !password;

    if (noEmail || noPassword) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/c228a04e-823d-457a-8d70-68f40b99119b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'debug-session',
          runId: 'register-existing',
          hypothesisId: 'H5',
          location: 'auth-controller.js:register',
          message: 'User already exists branch',
          data: { email },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log

      return res
        .status(400)
        .json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData = {
      email: email,
      password: hashedPassword,
    };

    const user = await User.create(newUserData);

    const token = generateToken(user._id);

    const responseBody = {
      token: token,
      user: {
        id: user._id,
        email: user.email,
      },
    };

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c228a04e-823d-457a-8d70-68f40b99119b', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'register-success',
        hypothesisId: 'H6',
        location: 'auth-controller.js:register',
        message: 'Register succeeded before send',
        data: { userId: String(user._id) },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log

    return res
      .status(201)
      .json(responseBody);
  } catch (error) {
    console.error('Register error', error);

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c228a04e-823d-457a-8d70-68f40b99119b', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'register-error',
        hypothesisId: 'H7',
        location: 'auth-controller.js:register',
        message: 'Register threw error',
        data: { errorMessage: error?.message || null },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log

    return res
      .status(500)
      .json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const noEmail = !email;
    const noPassword = !password;

    if (noEmail || noPassword) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    const responseBody = {
      token: token,
      user: {
        id: user._id,
        email: user.email,
      },
    };

    return res
      .status(200)
      .json(responseBody);
  } catch (error) {
    console.error('Login error', error);

    return res
      .status(500)
      .json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
};

