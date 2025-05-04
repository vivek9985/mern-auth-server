import nodemailer from "nodemailer";

const sendMailer = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
    to: options?.email,
    subject: options?.subject,
    text: options?.text,
    html: options?.html,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  console.log("Send mail info:", info);
};

export default sendMailer;
