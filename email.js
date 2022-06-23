const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
function Sendemail(email, password) {
  const msg = {
    to: email, // Change to your recipient
    from: 'ihsanumair@gmail.com', // Change to your verified sender
    subject: 'Here is your password',
    text: `this is password ${password}`,
    html: `'<a href="http://localhost:5000/login" target="_blank">Account Created Successfully: this is your password</a>'${password}`,
  }
  sgMail.send(msg).then(() => {
    console.log('Email sent', password)
  })
}

module.exports = Sendemail
