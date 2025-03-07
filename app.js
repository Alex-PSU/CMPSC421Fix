const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

// MongoDB URI
const mongoURI = 'mongodb+srv://ajh7050:8UkpmTRYja0ZVPxC@cluster0.yqpfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'A simple API for customer orders and payments',
    },
  },
  apis: ['./app.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created
 */
app.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.status(201).json(customer);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Order created
 */
app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
app.get('/orders/:orderId', async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).send('Order not found');
  res.status(200).json(order);
});

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Cancel an order
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order canceled
 *       404:
 *         description: Order not found
 */
app.delete('/orders/:orderId', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.orderId, { status: 'canceled' }, { new: true });
  if (!order) return res.status(404).send('Order not found');
  res.status(200).json(order);
});

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Submit a payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Payment processed
 */
app.post('/payments', async (req, res) => {
  setTimeout(async () => {
    const payment = new Payment(req.body);
    payment.status = 'paid';
    await payment.save();
    res.status(201).json(payment);
  }, 2000);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
