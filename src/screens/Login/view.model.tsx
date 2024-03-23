import { useState } from "react";
import { sleep } from "../../utils/functions";

function LoginViewModel() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setLoading] = useState<boolean>(false);

	const handleLogin = async () => {
		setLoading(true);
		await sleep(2000);
		setLoading(false);
	};

	return {
		username,
		password,
		setUsername,
		setPassword,
		isLoading,
		handleLogin,
	};
}

export default LoginViewModel;
