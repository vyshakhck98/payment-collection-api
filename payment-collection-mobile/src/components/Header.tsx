import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Payment Collection</Text>

        <Text style={styles.subtitle}>Personal Loan EMI Payment</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2563EB",
    paddingTop: 55,
    paddingBottom: 22,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 14,
    color: "#DBEAFE",
    marginTop: 4,
  },
});
