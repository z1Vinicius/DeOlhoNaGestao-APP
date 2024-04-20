import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { RegisterValidationSchema } from "../../validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterViewModel() {
	const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

	const handleTogglePassword = (mode: "password" | "confirmPassword") => {
		if (mode === "password") {
			setShowPassword((prevState) => ({ ...prevState, password: !prevState.password }));
		} else if (mode === "confirmPassword") {
			setShowPassword((prevState) => ({ ...prevState, confirmPassword: !prevState.confirmPassword }));
		}
	};

	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			username: "",
			fullName: "",
			password: "",
			confirmPassword: "",
			city: "",
		},
		resolver: zodResolver(RegisterValidationSchema),
	});

	const onSubmit = (data) => {
		Alert.alert("Successful", JSON.stringify(data));
	};

	return {
		control,
		onSubmit,
		handleSubmit,
		showPassword,
		handleTogglePassword,
	};
}

export default RegisterViewModel;
