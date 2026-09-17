# Payment Collection Application

## 1. Project Overview

Payment Collection is a mobile application for collecting Personal Loan EMI payments from customers.

The application allows a customer/collection user to:

- Enter a registered loan account number.
- Retrieve the corresponding loan details.
- View EMI amount, interest rate, tenure and issue date.
- Enter/confirm a payment amount.
- Submit the payment through the backend API.
- View the payment confirmation and payment ID.

## 2. Technology Stack

### Mobile Frontend
- React Native
- Expo
- Expo Router
- TypeScript
- Axios

### Backend
- Node.js
- Express.js
- REST API
- PostgreSQL

### Deployment
- AWS EC2
- PM2 for Node.js process management
- EAS Build for Android APK
- GitHub for source-code hosting

## 3. Project Structure

```text
payment-collection-api/
├── payment-collection-api/
│   └── Node.js / Express backend
│
└── payment-collection-mobile/
    └── React Native / Expo mobile application
```

## 4. Main Application Flow

1. User opens the mobile application.
2. User enters an account number such as `ACC1001`.
3. The mobile application calls the customer lookup API.
4. Backend retrieves the customer/loan record from PostgreSQL.
5. Loan details are displayed in the mobile application.
6. EMI amount is populated from the loan record.
7. User submits the payment.
8. Backend creates the payment record.
9. Mobile application displays the payment confirmation.

## 5. API Endpoints

### Health Check

```http
GET /
```

Example response:

```json
{
  "success": true,
  "message": "Payment Collection API is running"
}
```

### Database Health Check

```http
GET /db-test
```

### Get Customers

```http
GET /customers
```

### Get Customer by Account Number

```http
GET /customers/account/:accountNumber
```

Example:

```http
GET /customers/account/ACC1001
```

Example response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "account_number": "ACC1001",
    "issue_date": "2026-01-10T00:00:00.000Z",
    "interest_rate": "10.50",
    "tenure": 24,
    "emi_due": "8500.00"
  }
}
```

### Get Payments

```http
GET /payments
```

### Get Customer Payments

```http
GET /payments/customer/:customerId
```

### Create Payment

```http
POST /payments
```

The mobile application sends the selected account number and payment amount.

## 6. Sample Test Data

| Account Number | Interest Rate | Tenure | EMI |
|---|---:|---:|---:|
| ACC1001 | 10.50% | 24 months | ₹8,500 |
| ACC1002 | 11.25% | 36 months | ₹12,500 |
| ACC1003 | 9.75% | 18 months | ₹6,500 |

## 7. Backend Deployment

The backend is deployed on AWS EC2.

Deployed API base URL:

```text
http://13.235.105.99:5000
```

Example:

```text
http://13.235.105.99:5000/customers/account/ACC1001
```

The backend process is managed using PM2 so that the Node.js service can continue running independently of the SSH terminal session.

## 8. Mobile API Configuration

The mobile application uses the deployed backend rather than the local development server.

Current API base URL:

```text
http://13.235.105.99:5000
```

The Android build is configured to permit HTTP cleartext traffic because the current test deployment uses HTTP rather than HTTPS.

For a production deployment, HTTPS should be used.

## 9. Running the Backend Locally

```bash
npm install
npm start
```

The backend should be available on:

```text
http://localhost:5000
```

## 10. Running the Mobile Application

```bash
npm install
npx expo start
```

Expo Go can be used for development testing.

## 11. Android Build

The project is configured for EAS Build.

Preview APK:

```bash
eas build --platform android --profile preview
```

The final APK download link should be added here before submission:

```text
FINAL APK LINK: <add final EAS APK link>
```

## 12. Source Code

GitHub repository:

https://github.com/vyshakhck98/payment-collection-api

The repository contains both:

- `payment-collection-api` — backend
- `payment-collection-mobile` — mobile application

## 13. Testing Completed

The following were verified during development:

- Backend health endpoint
- Database connection
- Customer list API
- Account-number customer lookup
- Payment creation
- Payment list API
- Mobile application API integration
- AWS EC2 deployment
- PM2 process management
- Android EAS build

## 14. Important Deployment Note

The current assessment deployment uses an EC2 public IP with HTTP on port 5000.

For production use, the recommended architecture is:

```text
Mobile App
    |
    | HTTPS
    v
Domain / Reverse Proxy
    |
    v
Node.js API
    |
    v
PostgreSQL
```

This would avoid exposing the Node.js application directly over an HTTP port.

