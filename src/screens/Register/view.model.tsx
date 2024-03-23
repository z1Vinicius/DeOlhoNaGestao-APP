import { useState } from "react";

function RegisterViewModel() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return {
		username,
		password,
		setUsername,
		setPassword,
	};
}

export default RegisterViewModel;
