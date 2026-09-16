import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface AccountFormProps {
  accountNumber: string;
  onAccountNumberChange: (value: string) => void;
  onGetLoanDetails: () => void;
}

export default function AccountForm({
  accountNumber,
  onAccountNumberChange,
  onGetLoanDetails,
}: AccountFormProps) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        Find Your Loan
      </Text>

      <Text style={styles.subtitle}>
        Enter your account number to continue
      </Text>

      <Text style={styles.label}>
        Account Number
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter account number"
        value={accountNumber}
        onChangeText={onAccountNumberChange}
        autoCapitalize="characters"
        autoCorrect={false}
        placeholderTextColor="#9CA3AF"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onGetLoanDetails}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          Get Loan Details
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

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
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
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },

  button: {
    height: 50,
    marginTop: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});