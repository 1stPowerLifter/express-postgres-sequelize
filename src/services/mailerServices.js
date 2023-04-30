const NodeMailerServices = require('./nodeMailerServices');
const SendGridServices = require('./sendGridServices');

const { MAIL_SENDER = '' } = process.env;

class MailerServices {
  get() {
    switch (MAIL_SENDER) {
      case 'SENDGID':
        return SendGridServices;
      case 'NODEMAILER':
        return NodeMailerServices;
      default:
        break;
    }
    const error = new Error('Mailer is not selected');
    error.status = 500;
    throw error;
  }

  selected = () => MAIL_SENDER;
}

module.exports = new MailerServices();
