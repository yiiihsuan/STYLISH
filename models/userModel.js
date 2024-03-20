import { pool } from './util.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';


const secretKey = process.env.secretKey;

export async function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


export async function getUserByEmail(email){
  try {
    const [result] = await pool.query('SELECT id FROM user WHERE email = ?', [email]);
    return result.length;
  } catch (error) {
    throw error;
  }
}

export async function createUser(name, email, password) {
    try {
        const [result] = await pool.query(
            'INSERT INTO user (name, email, password) VALUES (?, ?, ?);',[name, email, password]
        );
        return result.insertId;
      } catch (error) {
        throw error;
      }
  }

export async function getUserById(userId) {
    const selectUserQuery = 'SELECT * FROM user WHERE id = ?';
    const results = await pool.query(selectUserQuery, [userId]);
    return results.length > 0 ? results[0] : null;
  }
  
export async function getUserIdFromAccessToken(accessToken) {
    try {
      const decodedToken = jwt.verify(accessToken, secretKey);
      return decodedToken.id;
    } catch (error) {
      console.error('Error verifying access token:', error);
      return null;
    }
  }
  
export async function signInNative(email, password) {
    const signInQuery = 'SELECT * FROM user WHERE email = ?';
    const [results] = await pool.query(signInQuery, [email]);

    if (results.length === 0) {
      throw new Error('User not found');
    }

    const user = results[0];

    return new Promise(async (resolve, reject) => {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const userInformation = {
                id: user.id,
                provider: 'native',
                name: user.name,
                email: user.email,
                picture: user.picture
            };

            const tokenData = {
                data: {
                    access_token: jwt.sign(userInformation, secretKey),
                    user: userInformation
                }
            };

            resolve(tokenData.data);
        } else {
            reject(new Error('Password does not match'));
        }
    });
}


 export async function signInFacebook(accessToken) {
    //const url = `https://graph.facebook.com/me?fields=email,picture,id,name&access_token=${accessToken}`;

    const url =`https://graph.facebook.com/v18.0/me?fields=id,name,picture{url}&access_token=${accessToken}`;
    try {
      const response = await axios.get(url);
      const { name, picture: { data: { url: picture } } } = response.data;
  

    const user = {
        id: response.data.id,
        provider: 'facebook',
        name:response.data.name,
        picture:response.data.picture.data.url
      };
  
  
      const tokenData = {
        data: {
          access_token: jwt.sign(user, secretKey, { expiresIn: 3600 }),
          user
        }
      };
      return tokenData;
    } catch (error) {
      throw new Error('Error connecting to Facebook Graph API');
    }
  }
  
export async function getUserProfile(userId) {
    try {
      const result = await pool.query('SELECT id, name, email, provider, picture FROM user WHERE id = ?', [userId]);
      if (result.length > 0) {
        return result[0];
      } else {
        throw new Error('User not found.');
      }
    } catch (error) {
      throw error;
    }
  };







  