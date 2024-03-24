import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { LoginValidationSchema } from "../../validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { sleep } from "../../utils/functions";

function LoginViewModel() {
	const [loading, setLoading] = useState<boolean>(false);
	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: zodResolver(LoginValidationSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		await sleep(2000);
		Alert.alert("Successful", JSON.stringify(data));
		setLoading(false);
	};

	return {
		loading,
		control,
		onSubmit,
		handleSubmit,
	};
}

export default LoginViewModel;
