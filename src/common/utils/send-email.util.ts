import nodemailer from 'nodemailer';
import { EventEmitter } from 'stream';

export const Events = new EventEmitter();

export const sendEmail = async (mailOptions: nodemailer.SendMailOptions) => {
  try {
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST || 'smtp.gmail.com',
      port: process.env.MAILER_PORT ? parseInt(process.env.MAILER_PORT) : 465,
      secure: true,
      auth: {
        user: process.env.MAILER_APP_USER,
        pass: process.env.MAILER_APP_PASSWORD,
      },
    });

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};

Events.on('sendEmail', async (options: nodemailer.SendMailOptions) => {
  try {
    await sendEmail(options);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});
