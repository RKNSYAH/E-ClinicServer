const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
    
  try {

    // create reusable transporter object using the default SMTP transport
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from:'lynn.gibson20@ethereal.email',
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
        attachments: [
          {
          filename: 'fullLogo.png',
          path: __dirname +'/image/fullLogo.png',
          cid: 'fullLogo'
    },
    {
      filename: 'resetLogo.png',
      path: __dirname + '/image/resetLogo.png',
      cid: 'resetLogo'
    }
  ],
      };
    };

    // Send email

    transporter.sendMail(options(), (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        transporter.close();
    });
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
