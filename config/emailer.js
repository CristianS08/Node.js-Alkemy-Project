const nodemailer = require('nodemailer');

//email sender configuration. created with mailtrap for test
const createTransp = () =>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b4557b12defea0",
          pass: "e4d7f956fa3b9c"
        }
    }); 

    return transport;
};

// 
const sendMail = async (user) => {
    const transporter = createTransp();
    const info = await transporter.sendMail({
        from: '"Example name" <example@example.com>',
        to: [`${user.email}`],
        subject: `Hello ${user.name}, welcome to your comunity`,
        html: '<b>Here you will be able to search for your favorite movies</b>'
    });

    console.log("Message sent: %s", info.messageId);

    return;
};

module.exports = sendMail;
