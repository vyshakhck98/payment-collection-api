import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface PaymentFormProps {
  amount: string;
  onAmountChange: (value: string) => void;
  onPay: () => void;
}

export default function PaymentForm({
  amount,
  onAmountChange,
  onPay,
}: PaymentFormProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        Make Payment
      </Text>

      <Text style={styles.label}>
        EMI Amount
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={onAmountChange}
        placeholderTextColor="#9CA3AF"
      />

      <TouchableOpacity
        style={styles.payButton}
        onPress={onPay}
      >
        <Text style={styles.buttonText}>
          Pay EMI
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },

  payButton: {
    height: 52,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16A34A',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});