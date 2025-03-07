This is a RESTful API for managing customers, orders, and payments in an e-commerce platform. The API is built using Node.js, Express, and MongoDB.

## Features

- Create, get, and delete customers.
- Create, get, and cancel orders.
- Submit and manage payments for orders.
- Fully documented API with Swagger for easy interaction.

## Requirements

- Node.js
- MongoDB (can be used with MongoDB Atlas or a local MongoDB instance)

## Installation

Follow the steps below to set up and run the application locally.

### 1. Clone the repository

```bash
git https://github.com/Alex-PSU/CMPSC421Fix
cd PSUCMPSC-421
```

### 2. Install dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies by running:

```bash
npm install
```

### 3. Set up MongoDB

You can use a local MongoDB instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based MongoDB service. Update the `mongoURI` in `server.js` with your connection string if needed.

### 4. Start the application

Run the following command to start the server:

```bash
npm start
```

The API will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Create Customer

- **POST** `/customers`
- **Description**: Creates a new customer.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "address": "123 Main St"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "_id": "customer_id",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "address": "123 Main St"
    }
    ```
  - **400 Bad Request**: Invalid input.

### 2. Create Order

- **POST** `/orders`
- **Description**: Creates a new order for a customer.
- **Request Body**:
  ```json
  {
    "customerId": "customer_id",
    "products": ["product1", "product2"]
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "_id": "order_id",
      "customerId": "customer_id",
      "products": ["product1", "product2"],
      "status": "created"
    }
    ```
  - **400 Bad Request**: Invalid input.

### 3. Get Order

- **GET** `/orders/{orderId}`
- **Description**: Retrieves an order by its ID.
- **Response**:
  - **200 OK**:
    ```json
    {
      "_id": "order_id",
      "customerId": "customer_id",
      "products": ["product1", "product2"],
      "status": "created"
    }
    ```
  - **404 Not Found**: Order not found.

### 4. Cancel Order

- **DELETE** `/orders/{orderId}`
- **Description**: Cancels an order by its ID.
- **Response**:
  - **200 OK**:
    ```json
    {
      "_id": "order_id",
      "customerId": "customer_id",
      "products": ["product1", "product2"],
      "status": "canceled"
    }
    ```
  - **404 Not Found**: Order not found.

### 5. Submit Payment

- **POST** `/payments`
- **Description**: Submits a payment for an order.
- **Request Body**:
  ```json
  {
    "orderId": "order_id",
    "paymentMethod": "credit_card",
    "amount": 100
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "_id": "payment_id",
      "orderId": "order_id",
      "paymentMethod": "credit_card",
      "amount": 100,
      "status": "paid"
    }
    ```
  - **400 Bad Request**: Invalid input.

## Swagger Documentation

The API is fully documented using [Swagger](https://swagger.io/). You can view and interact with the API documentation by visiting:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Swagger UI allows you to test API endpoints directly in your browser.

## Running Tests

You can use any HTTP client like Postman, Insomnia, or cURL to test the API endpoints. Here's an example using `curl`:

1. **Create a Customer**:
   ```bash
   curl -X POST http://localhost:3000/customers -H "Content-Type: application/json" -d '{"name":"John Doe","email":"johndoe@example.com","address":"123 Main St"}'
   ```

2. **Create an Order**:
   ```bash
   curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"customerId":"customer_id","products":["product1","product2"]}'
   ```

3. **Get Order**:
   ```bash
   curl http://localhost:3000/orders/{orderId}
   ```

4. **Cancel Order**:
   ```bash
   curl -X DELETE http://localhost:3000/orders/{orderId}
   ```

5. **Submit Payment**:
   ```bash
   curl -X POST http://localhost:3000/payments -H "Content-Type: application/json" -d '{"orderId":"order_id","paymentMethod":"credit_card","amount":100}'
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
