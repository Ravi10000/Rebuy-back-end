const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sale.mr.phonex@gmail.com",
      pass: "ysnmjiqskhlhirho",
    },
  });

  const mailOptions = {
    from: "sale phonex <sale.mr.phonex@gmail.com>",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    error && console.log({ error });
    info && console.log({ info });
  });
}

module.exports = sendEmail
// sendEmail(
//   "ravisince2k@gmail.com",
//   "test mail",
//   `
//   <html>
//   <b>Hello World</b>
//     <p style={color: royalblue; font-size: 24px; background-color: grey;}>This is a test mail</p>
//   </html>
//   `
// );
