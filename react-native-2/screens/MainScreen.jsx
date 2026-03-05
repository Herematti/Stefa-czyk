import { useState } from "react";
import { View, TextInput, Text, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import MyButton from "../components/MyButton";
import Settings from "../Settings.json";

const MainScreen = ({ navigation }) => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleRegisterAndLogin = async () => {
		try {
			const res = await fetch(`${Settings.address}:${Settings.port}/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ login, password }),
			});
			const data = await res.json();

			if (res.status === 409) {
				setMessage("User już istnieje");
			} else {
				setMessage("Zarejestrowano!");
				navigation.navigate("users");
			}
		} catch (err) {
			setMessage("Błąd połączenia z serwerem");
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<Text style={styles.title}>Logowanie</Text>
			<TextInput
				style={styles.input}
				placeholder="Login"
				value={login}
				onChangeText={setLogin}
			/>
			<TextInput
				style={styles.input}
				placeholder="Hasło"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			{message ? <Text style={styles.message}>{message}</Text> : null}
			<MyButton text="Zarejestruj i zaloguj" color="#6200ea" onPress={handleRegisterAndLogin} />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 24,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 24,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		fontSize: 16,
	},
	message: {
		color: "red",
		marginBottom: 12,
		textAlign: "center",
	},
});

export default MainScreen;