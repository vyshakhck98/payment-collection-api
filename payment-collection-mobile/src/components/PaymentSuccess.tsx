import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface PaymentSuccessProps {
  amount: string;
  paymentId?: number;
  onDone: () => void;
}

export default function PaymentSuccess({
  amount,
  paymentId,
  onDone,
}: PaymentSuccessProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>

        <View style={styles.successCircle}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.title}>
          Payment Successful
        </Text>

        <Text style={styles.message}>
          Your EMI payment has been received successfully.
        </Text>

        <Text style={styles.amount}>
          ₹{Number(amount).toLocaleString('en-IN')}
        </Text>

        {paymentId && (
          <Text style={styles.paymentId}>
            Payment ID: #{paymentId}
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={onDone}
        >
          <Text style={styles.buttonText}>
            Done
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },

  successCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  check: {
    fontSize: 38,
    fontWeight: '700',
    color: '#16A34A',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },

  message: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },

  amount: {
    fontSize: 30,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 8,
  },

  paymentId: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});