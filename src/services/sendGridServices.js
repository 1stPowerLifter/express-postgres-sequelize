const sgMail = require('@sendgrid/mail');
const MailsRepositories = require('../repositories');
const QueueServises = require('./queueServices');
const { SENDGRID_MAIL = '', SENDGRID_API_KEY = '' } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

class SandGrid {
  sandGridMail = SENDGRID_MAIL;
  mailer = sgMail;
  queue = QueueServises.createNewQueue('SandGrid email queue', async (job) => {
    await this.mailer.send(job.data);
  });

  async sendMail({ email, subject = '', text = '', html = '' }) {
    const msg = {
      to: email,
      from: this.sandGridMail,
      subject,
      text,
      html,
    };
    await MailsRepositories.add({ email, subject, text, html });
    await this.mailer.send(msg);
  }

  async sendQueueMails(emails = [], { subject = '', text = '', html = '' }) {
    const queueMails = emails.map((email) => ({
      name: 'mail',
      data: {
        to: email,
        from: this.sandGridMail,
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

module.exports = new SandGrid();
