const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB URI (using your provided username and password)
const mongoURI = 'mongodb+srv://ajh7050:8UkpmTRYja0ZVPxC@cluster0.yqpfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Customer model
const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: String,
  email: String,
  address: String
}));

// Order model
const Order = mongoose.model('Order', new mongoose.Schema({
  customerId: String,
  products: Array,
  status: { type: String, default: 'created' }
}));

// Payment model
const Payment = mongoose.model('Payment', new mongoose.Schema({
  orderId: String,
  paymentMethod: String,
  amount: Number,
  status: { type: String, default: 'pending' }
}));

// 1. Create Customer
app.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.status(201).json(customer);
});

// 2. Create Order
app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// 3. Get Order
app.get('/orders/:orderId', async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).send('Order not found');
  res.status(200).json(order);
});

// 4. Cancel Order
app.delete('/orders/:orderId', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.orderId, { status: 'canceled' }, { new: true });
  if (!order) return res.status(404).send('Order not found');
  res.status(200).json(order);
});

// 5. Submit Payment
app.post('/payments', async (req, res) => {
  // Simulate async operation (e.g., payment processing)
  setTimeout(async () => {
    const payment = new Payment(req.body);
    payment.status = 'paid';
    await payment.save();
    res.status(201).json(payment);
  }, 2000); // Simulate 2-second delay
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
