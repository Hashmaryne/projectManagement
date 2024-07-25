import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class Auth {
  static authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 8);
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

export default Auth;
