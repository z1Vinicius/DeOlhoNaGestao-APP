import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { RegisterValidationSchema } from "../../validators/auth";
import { yupResolver } from "@hookform/resolvers/yup";

function RegisterViewModel() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ resolver: yupResolver(RegisterValidationSchema) });
	const onSubmit = (data) => Alert.alert(data.username);

	useEffect(() => {
		register("username");
		register("fullName");
		register("email");
		register("password");
		register("confirmPassword");
	}, [register]);

	return {
		register,
		errors,
		setValue,
		onSubmit,
		handleSubmit,
	};
}

export default RegisterViewModel;
