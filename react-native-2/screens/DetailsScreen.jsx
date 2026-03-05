import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Settings from "../Settings.json";

const DetailsScreen = ({ route }) => {
  const { login } = route.params;  // odebrane z UsersScreen
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch(`${Settings.address}:${Settings.port}/users/${login}`);
    const data = await res.json();
    setUser(data);
  };

  if (!user) return <Text style={styles.loading}>Ładowanie...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login:</Text>
      <Text style={styles.value}>{user.login}</Text>
      <Text style={styles.label}>Hasło:</Text>
      <Text style={styles.value}>{user.password}</Text>
      <Text style={styles.label}>Data rejestracji:</Text>
      <Text style={styles.value}>{new Date(user.date).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginTop: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    textAlign: "center",
    marginTop: 40,
  },
});

export default DetailsScreen;