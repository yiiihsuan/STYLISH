
import jwt from 'jsonwebtoken';
import { getUserIdFromAccessToken } from '../models/userModel.js';
import 'dotenv/config';

const secretKey = process.env.secretKey;

export async function authorizationCheck(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Client Error (No token)',
    });
  }

  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({
      error: 'Client Error (No token)',
    });
  }

  async function getUserIdFromAccessToken(accessToken) {
    try {
      const decodedToken = await jwt.verify(accessToken, secretKey);
      console.log(`id =${decodedToken.id}`)
      return decodedToken.id;
    } catch (error) {
      console.error('Error verifying access token:', error);
      return null;
    }
  }

  const userId = await getUserIdFromAccessToken(accessToken);
  console.log(`user id = ${userId}`);

  if (!userId) {
    return res.status(403).json({
      error: 'Client Error (Wrong token)',
    });
  }
  req.userId = userId;
  next();
}

