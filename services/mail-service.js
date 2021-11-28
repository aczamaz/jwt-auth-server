const nodemailer = require('nodemailer');
class MailService {
    constructor()
    {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure:true,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    async sendActivationMail(to,link){
        this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация на сайте' + process.env.API_URL,
            text:'',
            html:
                `
                    <div>
                        <h1>Для активации нажмите на ссылку</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        }).then(res=>console.log(res))
        .catch(err=>console.log(err));
    }
}

module.exports = new MailService();