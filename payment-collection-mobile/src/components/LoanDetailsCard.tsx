import { StyleSheet, Text, View } from 'react-native';

interface LoanDetails {
  account_number: string;
  issue_date: string;
  interest_rate: string;
  tenure: number;
  emi_due: string;
}

interface LoanDetailsCardProps {
  loanDetails: LoanDetails;
}

export default function LoanDetailsCard({
  loanDetails,
}: LoanDetailsCardProps) {
  const formattedDate = new Date(
    loanDetails.issue_date
  ).toLocaleDateString();

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        Loan Details
      </Text>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>
          Account Number
        </Text>

        <Text style={styles.detailValue}>
          {loanDetails.account_number}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>
          Issue Date
        </Text>

        <Text style={styles.detailValue}>
          {formattedDate}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>
          Interest Rate
        </Text>

        <Text style={styles.detailValue}>
          {loanDetails.interest_rate}%
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>
          Tenure
        </Text>

        <Text style={styles.detailValue}>
          {loanDetails.tenure} Months
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.emiRow}>
        <Text style={styles.emiLabel}>
          EMI Due
        </Text>

        <Text style={styles.emiAmount}>
          ₹{Number(loanDetails.emi_due).toLocaleString('en-IN')}
        </Text>
      </View>
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

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },

  emiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },

  emiLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },

  emiAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2563EB',
  },
});