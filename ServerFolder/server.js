const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];  // w prawdziwej apce tu byłaby baza danych

app.get("/users", (req, res) => {
	res.json(users);
});

app.get("/users/:login", (req, res) => {
	const user = users.find(u => u.login === req.params.login);
	if (!user) return res.status(404).json({ error: "Nie znaleziono" });
	res.json(user);
});

app.post("/register", (req, res) => {
	const { login, password } = req.body;
	if (users.find(u => u.login === login)) {
		return res.status(409).json({ error: "User już istnieje" });
	}
	users.push({ login, password, date: new Date() });
	res.json({ ok: true });
});

app.delete("/users/:login", (req, res) => {
	users = users.filter(u => u.login !== req.params.login);
	res.json({ ok: true });
});

app.listen(3000, () => console.log("Serwer działa na porcie 3000"));