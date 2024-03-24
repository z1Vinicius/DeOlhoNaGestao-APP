import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { RegisterValidationSchema } from "../../validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterViewModel() {
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
	};
}

export default RegisterViewModel;
