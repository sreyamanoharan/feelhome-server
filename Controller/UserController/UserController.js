import { generateToken } from '../../middlewares/auth.js';
import userCollection from '../../Models/UserModel.js';
const SALT = process.env.SALT;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FRONTENDURL = process.env.FRONTEND_URL; // ← from .env

import nodemailer from 'nodemailer';
import sha256 from 'sha256';
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types


export const sendVerifyMail = async (name, email, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'feelhomewebsite@gmail.com',
        pass: EMAIL_PASS,
      },
    });

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 1);
    const expirationToken = encodeURIComponent(expirationTime.toISOString());

    const mailOptions = {
      from: 'feelhomewebsite@gmail.com',
      to: email,
      subject: 'email verification',
      html: `<p>Hii ${name}, please click <a href="${FRONTENDURL}verifyMail/${userId}?name=${name}&email=${email}&expires=${expirationToken}">here</a> to verify your email.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Email has been sent', info.response);
      }
    });
  } catch (err) {
    console.error(err.message);
    console.log('Email cannot be sent');
  }
};

export const verifyMail = async (req, res) => {
  try {
    const expirationToken = req.query.expires;
    const expirationTime = new Date(expirationToken);

    if (expirationTime > new Date()) {
      const { userId } = req.params;
      await userCollection.updateOne({ _id: userId }, { $set: { isVerified: true } });
      res.status(200).json({ message: 'Email verified successfully' });
    } else {
      res.status(400).json({ errmsg: 'email expired, send mail again' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errmsg: 'Server error' });
  }
};

export const resendMail = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userCollection.findOne({ _id: userId });

    if (user) {
      sendVerifyMail(user.name, user.email, userId);
      res.status(200).json({ message: 'Verification email has been resent.' });
    } else {
      res.status(402).json({ errmsg: 'user not found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: 'Server error' });
  }
};

export const ClientRegister = async (req, res) => {
  try {
    let { name, email, PhoneNumber, password } = req.body;
    email = email.trim();
    password = password.trim();

    const user = await userCollection.findOne({ $or: [{ email }, { PhoneNumber }] });

    if (user && !user.password) {
      return res.status(409).json({ message: 'User already exists, try Google login' });
    } else if (user) {
      return res.status(409).json({ message: 'User already exists' });
    } else {
      const newUser = await userCollection.create({
        name,
        email,
        PhoneNumber,
        password: sha256(password + SALT),
      });
      sendVerifyMail(newUser.name, newUser.email, newUser._id);
      res.status(201).json({ message: 'User registered successfully, Check your mail for verification' });
    }
  } catch (error) {
    console.error('Error while registering user:', error);
    res.status(500).json({ errmsg: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password, reMail } = req.body;
    const user = await userCollection.findOne({
      $and: [{ email }, { password: sha256(password + SALT) }],
    });

    if (!user) {
      res.status(400).json({ errmsg: "Password and email is incorrect" });
    } else if (user.isBlocked) {
      res.status(403).json({ errmsg: "Account is blocked by admin" });
    } else if (user && reMail) {
      sendVerifyMail(user.name, user.email, user._id);
    } else if (!user.isVerified) {
      res.status(401).json({ errmsg: "Verify your mail" });
    } else {
      const token = generateToken(user._id, 'user');
      res.status(200).json({
        message: "user successfully login",
        name: user.name,
        userId: user._id,
        token,
        role: 'user'
      });
    }
  } catch (error) {
    res.status(500).json({ errmsg: "server error" });
    console.log(error);
  }
};

export const loadProfile = async (req, res) => {
  try {
    const userId = req.payload.id;
    const user = await userCollection.findOne({ _id: userId });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ errmsg: "Server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    let { name, profileImage, PhoneNumber } = req.body;
    name = name.trim();
    await userCollection.updateOne(
      { _id: req.payload.id },
      { $set: { name, profileImage, PhoneNumber } }
    );
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    return res.status(500).json({ errmsg: "Server Error" });
  }
};

export const users = async (req, res) => {
  try {
    let { userId } = req.params;
    const users = await userCollection.findById(userId);
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: 'Server error' });
  }
};

export const getUserNum = async (req, res) => {
  try {
    const num = await userCollection.countDocuments();
    res.status(200).json({ num });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: 'Server error' });
  }
};

export const latestUsers = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0);

    const num = await userCollection.countDocuments({
      registrationDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.status(200).json({ num });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const userGlogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ errmsg: "Google email is required" });
    }

    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        errmsg: "No account found with this email. Please register first."
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({ errmsg: "Account is blocked by admin" });
    }

    const token = generateToken(user._id, 'user');

    return res.status(200).json({
      message: "Google login successful",
      name: user.name,
      userId: user._id,
      token,
      role: 'user'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errmsg: "Google login failed" });
  }
};

const forgotPasswordMail = async (email, name, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'feelhomewebsite@gmail.com',
        pass: EMAIL_PASS
      },
    });

    const mailOptions = {
      from: 'feelhomewebsite@gmail.com',
      to: email,
      subject: 'Forgot Password',
      html: `<p>Hello ${name}, Please click <a href="${FRONTENDURL}resetPassword/${userId}">here</a> if you want to reset your password</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('email could not be sent', error.message);
      } else {
        console.log('email has been sent', info.response);
      }
    });
  } catch (error) {
    console.log(error);
    console.log('error occurred while sending mail');
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userCollection.findOne({ email });

    if (user) {
      forgotPasswordMail(email, user.name, user._id);
      res.status(200).json({ message: 'Please check your mail' });
    } else {
      res.status(400).json({ errmsg: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ errmsg: 'Server error' });
  }
};

export const restPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    await userCollection.updateOne(
      { _id: userId },
      { $set: { password: sha256(password + SALT) } }
    );
    res.status(200).json({ message: 'Password Changed' });
  } catch (error) {
    res.status(500).json({ errmsg: "Server error" });
  }
};

export default {
  ClientRegister,
  sendVerifyMail,
  verifyMail,
  login,
  resendMail,
};