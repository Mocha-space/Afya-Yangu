import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../Config/Database.js';
import moment from 'moment/moment.js';




// Register User
export const registerUser = async (req, res) => {
  const { full_name, email, password } = req.body;

  try { 
    // Check if the user already exists
    const checkQuery = `SELECT * FROM users WHERE email = ?`;
    db.query(checkQuery, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', err });

      if (results.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user into the database
      const insertQuery = `INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)`;
      db.query(insertQuery, [full_name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error', err });

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', err });

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, role: 'user' }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.json({ message: 'Login successful' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Logout User
export const logoutUser = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logout successful' });
};

// Get user profile
export const getUserProfile = (req, res) => {
  const userId = req.user.id; // `req.user` is set by the verifyToken middleware

  const query = `SELECT full_name, email, phone_number, gender, date_of_birth, address, profile_image FROM users WHERE id = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(results[0]);
  });
};

// Update user profile
export const updateUserProfile = (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: User ID not found' });
  }

  const { full_name, phone_number, gender, date_of_birth, address } = req.body;

  // Validate required fields
  if (!full_name || !phone_number || !gender || !date_of_birth || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Format date_of_birth to YYYY-MM-DD
  const formattedDate = moment(date_of_birth).format('YYYY-MM-DD');

  const query = `
    UPDATE users 
    SET full_name = ?, phone_number = ?, gender = ?, date_of_birth = ?, address = ? 
    WHERE id = ?
  `;

  db.query(
    query,
    [full_name, phone_number, gender, formattedDate, address, userId],
    (err, results) => {
      if (err) {
        console.error('Database error during profile update:', err);
        return res.status(500).json({ error: 'Database error', details: err });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'Profile updated successfully' });
    }
  );
};


