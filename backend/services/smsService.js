// const twilio = require('twilio');
// require('dotenv').config();

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// async function sendSMS(to, message) {
//     try {
//         await client.messages.create({
//             body: message,
//             from: process.env.TWILIO_PHONE,
//             to
//         });
//         console.log(`✅ SMS sent to ${to}`);
//     } catch (err) {
//         console.error(`❌ SMS to ${to} failed:`, err.message);
//     }
// }

// module.exports = { sendSMS };



// 📁 backend/services/smsService.js

const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(to, message) {
    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE,
            to
        });
        console.log(`✅ SMS sent to ${to}`);
    } catch (err) {
        console.error(`❌ SMS to ${to} failed:`, err.message);
    }
}

// 🧾 Customize Order Placed Message
function getOrderPlacedMessage(phone, location) {
    const time = new Date().toLocaleString();
    return `🍕 New Order Received!
📞 Phone: ${phone}
📍 Location: ${location}
🕒 Time: ${time}`;
}

// ❌ Customize Order Cancelled Message
function getOrderCancelledMessage(orderId, phone) {
    const time = new Date().toLocaleString();
    return `⚠️ Order Cancelled
#️⃣ Order ID: ${orderId}
📞 Phone: ${phone}
🕒 Time: ${time}`;
}

module.exports = { sendSMS, getOrderPlacedMessage, getOrderCancelledMessage };
