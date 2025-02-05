
import express from 'express';
import { loginAdmin, getAllDoctors, addDoctor, updateDoctor, deleteDoctor, getAllAppointments, cancelAppointment } from '../../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Authentication routes
router.post('/login', loginAdmin);

// Admin verification route
router.get('/verify', authMiddleware, (req, res) => {
  // If middleware passes, we know the token is valid
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Not an admin' });
  }
  res.status(200).json({ message: 'Admin verified successfully' });
});

// Protected routes
router.get('/doctors', authMiddleware, getAllDoctors);
router.post('/doctors', authMiddleware, addDoctor);
router.put('/doctors/:id', authMiddleware, updateDoctor);
router.delete('/doctors/:id', authMiddleware, deleteDoctor);
router.get('/appointments', authMiddleware, getAllAppointments);
router.put('/appointments/:id', authMiddleware, cancelAppointment);

export default router;