
import jwt from 'jsonwebtoken';
import db from '../Config/Database.js'



//Login as Admin


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try { 
    const query = `SELECT * FROM admins WHERE email = ?`;
    db.query(query, [email], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', err });

      if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

      const admin = results[0];

      // Directly compare the password with the one from the database
      if (password !== admin.password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Create token with consistent secret key
      const token = jwt.sign(
        { id: admin.id, isAdmin: true }, 
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Send token in both response and cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      res.json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Fetch all doctors
export const getAllDoctors = (req, res) => {
  const query = 'SELECT * FROM doctors';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    res.status(200).json(results);
  });
};

// Add a new doctor
export const addDoctor = (req, res) => {
  const { name, speciality, address, bio, image } = req.body;

  const query = `
    INSERT INTO doctors (name, speciality, address, bio, image)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [name, speciality, address, bio, image], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    res.status(201).json({ message: 'Doctor added successfully' });
  });
};

// Update doctor information
export const updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, speciality, address, bio, image } = req.body;

  const query = `
    UPDATE doctors 
    SET name = ?, speciality = ?, address = ?, bio = ?, image = ?
    WHERE id = ?
  `;
  db.query(query, [name, speciality, address, bio, image, id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor updated successfully' });
  });
};

// Delete a doctor
export const deleteDoctor = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM doctors WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
};
// Fetch all appointments
export const getAllAppointments = (req, res) => {
  const query = `
    SELECT a.id, a.appointment_date, a.payment_status, a.status,
           u.full_name AS user_name, d.name AS doctor_name
    FROM appointments a
    JOIN users u ON a.user_id = u.id
    JOIN doctors d ON a.doctor_id = d.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    res.status(200).json(results);
  });
};

// Cancel an appointment
export const cancelAppointment = (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE appointments 
    SET status = 'Cancelled' 
    WHERE id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment canceled successfully' });
  });
};

