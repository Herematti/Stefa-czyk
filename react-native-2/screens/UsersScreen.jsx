import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ListItem from "../components/ListItem";
import Settings from "../Settings.json";

const UsersScreen = ({ navigation }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const res = await fetch(`${Settings.address}:${Settings.port}/users`);
		const data = await res.json();
		setUsers(data);
	};

	const deleteUser = async (login) => {
		await fetch(`${Settings.address}:${Settings.port}/users/${login}`, {
			method: "DELETE",
		});
		fetchUsers(); // odśwież listę po usunięciu
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={users}
				keyExtractor={(item) => item.login}
				renderItem={({ item }) => (
					<ListItem
						user={item}
						onDelete={() => deleteUser(item.login)}
						onDetails={() => navigation.navigate("details", { login: item.login })}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});

export default UsersScreen;