const db = require('../database/db');
const { sendSMS } = require('../services/smsService');

// Place Order
exports.placeOrder = async (req, res) => {
    const { orderId, userPhone } = req.body;

    try {
        // TODO: You can save order logic here if needed

        const [rows] = await db.query('SELECT phone FROM admin_phones');
        const adminPhones = rows.map(row => row.phone);
        const message = `🍕 New Order #${orderId} placed by ${userPhone}`;

        for (const phone of adminPhones) {
            await sendSMS(phone, message);
        }

        res.json({ message: 'Order placed & admins notified ✅' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Cancel Order
exports.cancelOrder = async (req, res) => {
    const { orderId, userPhone } = req.body;

    try {
        // TODO: You can cancel order logic here if needed

        const [rows] = await db.query('SELECT phone FROM admin_phones');
        const adminPhones = rows.map(row => row.phone);
        const message = `❌ Order #${orderId} by ${userPhone} was CANCELLED`;

        for (const phone of adminPhones) {
            await sendSMS(phone, message);
        }

        res.json({ message: 'Order cancelled & admins notified ✅' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
