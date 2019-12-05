require('dotenv').config()
const twilio = require('twilio')
const client = twilio(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
);

client.messages
 .create({
   from: 'whatsapp:+14155238886',
   to: 'whatsapp:+628114101110',
   body: 'hallo kami dari lelang-house',
   mediaUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
 })
 .then(message => {
   console.log(message.sid);
 })
 .catch(err => {
   console.error(err);
 });