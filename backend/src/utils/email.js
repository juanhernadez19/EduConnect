const nodemailer = require("nodemailer");

/**
 * Transporter de correo
 * (por ahora usando Ethereal o Gmail según config)
 */
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER || "test@ethereal.email",
    pass: process.env.EMAIL_PASS || "password",
  },
});

/**
 * Enviar correo genérico
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: '"EduConnect" <no-reply@educonnect.com>',
      to,
      subject,
      html,
    });

    console.log("Correo enviado a:", to);
  } catch (error) {
    console.error("Error enviando correo:", error.message);
  }
};

module.exports = {
  sendEmail,
};
