const nodemailer = require('nodemailer');
const QueueServises = require('./queueServices');
const { MailsRepositories } = require('../repositories');
const { META_USER = '', META_PASS = '', META_HOST = '' } = process.env;

class NodeMailer {
  config = {
    host: META_HOST,
    port: 465,
    secure: true,
    auth: {
      user: META_USER,
      pass: META_PASS,
    },
  };
  transporter = nodemailer.createTransport(this.config);
  queue = QueueServises.createNewQueue('NodeMailer email queue', async (job) => {
    await this.transporter.sendMail(job.data);
  });

  async sendMail({ email, subject = '', text = '', html = '' }) {
    const emailOptions = {
      from: META_USER,
      to: email,
      subject,
      text,
      html,
    };
    await MailsRepositories.add({ email, subject, text, html });
    await this.transporter.sendMail(emailOptions);
  }

  async sendQueueMails(emails = [], { subject = '', text = '', html = '' }) {
    const queueMails = emails.map((email) => ({
      name: 'mail',
      data: {
        from: this.config.auth.user,
        to: email,
        subject,
        text,
        html,
      },
    }));
    await MailsRepositories.addMails(
      queueMails.map(({ data: { to, subject, text, html } }) => ({ email: to, subject, text, html })),
    );
    await this.queue.addBulk(queueMails);
  }
}

module.exports = new NodeMailer();
