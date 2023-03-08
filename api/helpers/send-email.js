var nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = {


  friendlyName: 'Send email',


  description: '',


  inputs: {
    to: {
      type: "string",
    },
    subject: {
      type: "string",
    },
    message: {
      type: "ref",
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    // TODO : Get from database

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      tls: { rejectUnauthorized: false }
    });

    var mailOptions = {
      from: process.env.FROM,
      to: inputs.to,
      subject: inputs.subject,
      text: inputs.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(new Date() + ' : ' + error);
        return exits.success({ error: error });
      } else {
        console.log(new Date() + ' : ' + 'Email sent: ', info.response);
        return exits.success({ message: "message sent" });
      }
    });

  }


};

