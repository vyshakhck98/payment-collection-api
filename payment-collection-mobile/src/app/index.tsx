import { useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Header from '../components/Header';
import AccountForm from '../components/AccountForm';
import LoanDetailsCard from '../components/LoanDetailsCard';
import PaymentForm from '../components/PaymentForm';
import PaymentSuccess from '../components/PaymentSuccess';

import api from '../services/api';

interface LoanDetails {
  id: number;
  account_number: string;
  issue_date: string;
  interest_rate: string;
  tenure: number;
  emi_due: string;
}

export default function HomeScreen() {
  const [accountNumber, setAccountNumber] = useState('');

  const [loanDetails, setLoanDetails] =
    useState<LoanDetails | null>(null);

  const [amount, setAmount] = useState('');

  const [loading, setLoading] = useState(false);

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

  const [paymentId, setPaymentId] =
    useState<number | undefined>();

  // ------------------------------------------
  // Get Loan Details
  // ------------------------------------------

  const getLoanDetails = async () => {
    const account = accountNumber.trim();

    if (!account) {
      Alert.alert(
        'Account Number Required',
        'Please enter your account number.'
      );
      return;
    }

    try {
      setLoading(true);

      setLoanDetails(null);

      const response = await api.get(
        `/customers/account/${account}`
      );

      console.log(
        'Loan details:',
        response.data
      );

      if (!response.data?.success) {
        Alert.alert(
          'Account Not Found',
          'Please check your account number and try again.'
        );

        return;
      }

      const customer = response.data.data;

      setLoanDetails(customer);

      // Automatically fill EMI amount
      setAmount(
        String(customer.emi_due)
      );

    } catch (error: any) {
      console.error(
        'Loan details error:',
        error
      );

      setLoanDetails(null);

      Alert.alert(
        'Account Not Found',
        error?.response?.data?.message ||
          'We could not find this account. Please check the account number.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // Make Payment
  // ------------------------------------------

  const makePayment = async () => {
    if (!loanDetails) {
      Alert.alert(
        'Loan Details Required',
        'Please enter your account number and get the loan details first.'
      );

      return;
    }

    if (!amount.trim()) {
      Alert.alert(
        'Amount Required',
        'Please enter the payment amount.'
      );

      return;
    }

    const paymentAmount = Number(amount);

    if (
      isNaN(paymentAmount) ||
      paymentAmount <= 0
    ) {
      Alert.alert(
        'Invalid Amount',
        'Please enter a valid payment amount.'
      );

      return;
    }

    try {
      setPaymentLoading(true);

      const response = await api.post(
        '/payments',
        {
          accountNumber:
            loanDetails.account_number,

          paymentAmount: paymentAmount,
        }
      );

      console.log(
        'Payment response:',
        response.data
      );

      // ------------------------------------------
      // Get Payment ID
      // ------------------------------------------

      let newPaymentId:
        | number
        | undefined;

      if (response.data?.data?.id) {
        newPaymentId =
          response.data.data.id;
      } else if (
        response.data?.payment?.id
      ) {
        newPaymentId =
          response.data.payment.id;
      } else if (response.data?.id) {
        newPaymentId =
          response.data.id;
      }

      setPaymentId(newPaymentId);

      // Show success screen
      setPaymentSuccess(true);

    } catch (error: any) {
      console.error(
        'Payment error:',
        error
      );

      Alert.alert(
        'Payment Failed',
        error?.response?.data?.message ||
          'We could not process the payment. Please try again.'
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // ------------------------------------------
  // Payment Done
  // ------------------------------------------

  const handlePaymentDone = () => {
    setPaymentSuccess(false);

    setAmount('');

    setLoanDetails(null);

    setAccountNumber('');
  };

  // ------------------------------------------
  // UI
  // ------------------------------------------

  return (
    <View style={styles.container}>

      {/* Header */}

      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >



        {/* Account Form */}

        <AccountForm
          accountNumber={accountNumber}
          onAccountNumberChange={
            setAccountNumber
          }
          onGetLoanDetails={
            getLoanDetails
          }
        />

        {/* Loan Loading */}

        {loading && (
          <View style={styles.loadingContainer}>

            <ActivityIndicator
              size="small"
              color="#2563EB"
            />

            <Text style={styles.loadingText}>
              Getting your loan details...
            </Text>

          </View>
        )}

        {/* Loan Details */}

        {loanDetails && !loading && (
          <View>

            <LoanDetailsCard
              loanDetails={loanDetails}
            />

            {/* Payment Form */}

            <PaymentForm
              amount={amount}
              onAmountChange={setAmount}
              onPay={makePayment}
            />

            {/* Payment Loading */}

            {paymentLoading && (
              <View
                style={
                  styles.paymentLoading
                }
              >
                <ActivityIndicator
                  size="small"
                  color="#16A34A"
                />

                <Text
                  style={
                    styles.loadingText
                  }
                >
                  Processing payment...
                </Text>
              </View>
            )}

          </View>
        )}

        {/* Bottom Help */}

        {!loanDetails &&
          !loading && (
            <View style={styles.helpBox}>

              <Text style={styles.helpTitle}>
                Need help?
              </Text>

              <Text style={styles.helpText}>
                Enter your registered account
                number above to continue.
              </Text>

            </View>
          )}

      </ScrollView>

      {/* Payment Success */}

      {paymentSuccess && (
        <PaymentSuccess
          amount={amount}
          paymentId={paymentId}
          onDone={handlePaymentDone}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  scrollView: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  intro: {
    marginBottom: 18,
  },

  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 5,
  },

  introText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 20,
  },

  paymentLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 10,
  },

  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#6B7280',
  },

  helpBox: {
    backgroundColor: '#EFF6FF',

    borderRadius: 12,

    padding: 16,

    marginTop: 5,
  },

  helpTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1D4ED8',
    marginBottom: 4,
  },

  helpText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#64748B',
  },

});