import nodemailer from 'nodemailer';

export default function sendMail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'enigmatrooper001@gmail.com',
      pass: '322s4hv6y8'
    }
  });

  const mailOptions = {
    from: 'enigmatrooper001@gmail.com',
    to: 'akashanil456@gmail.com',
    subject: 'This is a test',
    text: 'Hi is nodemailer working?'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error: ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
