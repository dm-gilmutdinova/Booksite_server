import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import EmployeeModel from '../models/Employee.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, avatarURL } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const doc = new EmployeeModel({
      email,
      username,
      password: hashPassword,
      avatarURL,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      {
        expiresIn: '30d',
      }
    );

    res.json({
      ...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Registration error',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(400).json({ message: `User ${email} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user._doc.password);
      if (!validPassword) {
        return res.json({ message: 'Incorrect password or email' });
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        'secret',
        {
          expiresIn: '30d',
        }
      );
      return res.json({
        ...user._doc,
        token,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Login error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User is not found',
      });
    }
    return res.json({
      ...user._doc,
    });
  } catch (err) {
    console.log(e);
    res.status(500).json({ message: 'No access' });
  }
};
