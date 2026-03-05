import { View, Text, Image, StyleSheet } from "react-native";
import MyButton from "./MyButton";

const ListItem = ({ user, onDelete, onDetails }) => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: "https://i.pravatar.cc/50" }}
				style={styles.avatar}
			/>
			<Text style={styles.name}>{user.login}</Text>
			<MyButton text="Details" color="#1976d2" onPress={onDetails} />
			<MyButton text="Delete" color="#e53935" onPress={onDelete} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		gap: 8,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	name: {
		flex: 1,
		fontSize: 16,
	},
});

export default ListItem;