import bcrypt from "bcryptjs"
import model  from "./models";
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const bcryptingPassword = (password) => bcrypt.hashSync(password, 10);

export const userExist = async (email) => await model.Users.findOne({where:{email:email}});

export const sendEmail = (userInfo) => {
  sgMail.setApiKey(process.env.SENDGRI_API_KEY);

  const mailOptions = {
    from: `${process.env.SENDER_EMAIL}`,
    to: userInfo.email,
    subject: userInfo.subject,
    html: userInfo.html
  };

  return sgMail.send(mailOptions)
    .then(() => 'Email sent')
    .catch((error) => {
      console.log(error);
    });
};


export const generateToken = (payload, expiresIn = '2d') => {
    const token = jwt.sign({ ...payload }, process.env.SECRET, { expiresIn });
    return token;
  };

export const sendVerificationEmail = async (req, res,first_name, email) => {

    const token = generateToken({ email });
  
    const userInfo = {
      email,
      subject: 'Verify your account',
      html: `<h2>Hello ${first_name},</h2><p>Welcome to Employees Management, Click on the link below to verify your account.</p> <br> <a href='localhost:3200/api/v1/user/verification?token=${token}'>Verify</a>`
    };
  
    const sendmail = await sendEmail(userInfo);
    return sendmail;
  };