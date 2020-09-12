require('dotenv').config()
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function approvalEmail(id) {

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.google.com",
//     service: "gmail",
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//     },
//   });

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Josh Odell" <joshodell220@gmail.com>', // sender address
    to: "joshodell220@gmail.com", // list of receivers
    subject: "New Incident Created", // Subject line
    text: "An Incident Report has been submitted. Please review the attached PDF and follow the link to approve the incident or respond to the sender.", // plain text body
    attachments: { path: 'C:/projects/school-server/IRF/IRF' + id + '.pdf'},
    html: '<p> A new Incident has been created. Please review the pdf and follow the link to add comments and return or approve the incident.</p> </br> <a href="http://localhost:3000/conformationpage/' + id + '">Approve  or Return Incident </a>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  })
}

async function returnEmail(id){
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let mailOptions = {
        from: '"Josh Odell" <joshodell220@gmail.com>', // sender address
        to: "joshodell220@gmail.com", // list of receivers
        subject: "Incident Revisions Requested", // Subject line
        html: '<p> Your incident requires further changes. Please follow the link to review comments and adjust the incident.</p> </br> <a href="http://localhost:3000/' + id + '">Review Incident </a>'
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      })
}

module.exports = approvalEmail
module.exports = returnEmail