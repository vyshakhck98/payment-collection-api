import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.6:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all customers
export const getCustomers = async () => {
  const response = await api.get('/customers');
  return response.data;
};

// Get all payments
export const getPayments = async () => {
  const response = await api.get('/payments');
  return response.data;
};

// Get payments for a specific customer
export const getCustomerPayments = async (customerId: number) => {
  const response = await api.get(`/payments/customer/${customerId}`);
  return response.data;
};

// Get customer/loan details by account number
export const getCustomerByAccountNumber = async (
  accountNumber: string
) => {
  const response = await api.get(
    `/customers/account/${accountNumber}`
  );

  return response.data;
};

// Create payment
export const createPayment = async (paymentData: {
  customer_id: number;
  payment_amount: number;
  status: string;
}) => {
  const response = await api.post('/payments', paymentData);
  return response.data;
};

export default api;