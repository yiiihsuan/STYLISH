
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {validateEmail,getUserByEmail,createUser,signInNative,getUserIdFromAccessToken,signInFacebook,getUserProfile} from '../models/userModel.js';


const secretKey = process.env.secretKey;

export async function signUp(req, res)  {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
      }
    
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

    const existingUser = await getUserByEmail(email);
    
    if (existingUser>0) {
      return res.status(409).json({ error: 'Email Already Exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = await createUser(name, email, hashedPassword);

    const user = {
          id: newUserId,
          provider: 'native', 
          name: name,
          email: email,
          picture: '123', 
    }

    const token = jwt.sign(user, secretKey, { expiresIn: 3600 });

    return res.status(200).json({
      data: {
        access_token: token,
        access_expired: 3600,
        user
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
};


export async function signIn(req, res){
    try {

        const { provider, email, password, access_token } = req.body;
      
        if (!provider || (provider === 'native' && (!email || !password)) || (provider === 'facebook' && !access_token)) {
          return res.status(400).json({ error: 'Invalid request' });
        }

        if (provider === 'native' && !validateEmail(email)) {
          return res.status(400).json({ error: 'Invalid email format' });
        }
    
        if (provider !== 'native' && provider !== 'facebook') {
          return res.status(403).json({ error: 'Invalid provider'});
        }

      let accessToken;
      let userData;

      if (provider === 'native') {
        const signInData = await signInNative(email, password);
        accessToken = signInData.access_token;
        userData = signInData.user;

      } else if (provider === 'facebook') {
        const fbsignInData = await signInFacebook(access_token);
        accessToken = fbsignInData.data.access_token;
        userData = fbsignInData.data.user;
        const userId = await getUserIdFromAccessToken(accessToken);
      }
  
      return res.status(200).json({
        data: {
          access_token: accessToken,
          access_expired: 3600,
          user: userData
        }
      });

    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
      }
  }



export async function userProfile(req, res) {
    try {
      const userId = req.userId;
      const userProfileData = await getUserProfile(userId);

      const responseData ={
        "provider": userProfileData[0].provider,
        "name": userProfileData[0].name,
        "email": userProfileData[0].email,
        "picture": userProfileData[0].picture
      }
  
      res.status(200).json({
        data: responseData,
      });
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({
        error: 'Server Error',
      });
    }
  };
