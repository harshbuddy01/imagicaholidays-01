require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

async function main() {
  try {
    const info = await transporter.sendMail({
      from: '"Imagica test" <9ec09d001@smtp-brevo.com>', // sender address
      to: "9ec09d001@smtp-brevo.com", // self
      subject: "Test email",
      text: "Hello world",
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
