import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';




import { 
  registerUser, 
  loginUser, 
  logoutUser,
  getUserProfile,
  updateUserProfile
} from '../Controllers/userController.js'




const router = express.Router();

// This route is used to verify the JWT
router.get('/verify', verifyToken, (req, res) => {
  res.json({ message: 'Token is valid' });
});


// Authentication
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

//Getting and updating the profile
router.get('/my-profile', verifyToken, getUserProfile);
router.put('/my-profile', verifyToken, updateUserProfile);







export default router;