import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import AuthService from "src/api/auth.services";
import database from "src/db/infra/db/settings/connection";
import { IAuthSuccess } from "src/interfaces/auth";
import AuthMapper from "src/mappers/auth.mapper";
import { setStorageToken } from "src/services/api";
import useStoreAuth from "src/stores/login";
import { sleep } from "src/utils/functions";
import { RegisterValidationSchema } from "../../validators/auth";

function RegisterViewModel() {
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
	const updateLogin = useStoreAuth((state) => state.emitEvent);

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

	const onSubmit = async (data) => {
		const registerService = await AuthService.register(data);
		const registerEntity = AuthMapper.AuthRegister(registerService);
		console.log(registerEntity);
		if (registerEntity.status === 201) {
			Toast.show({
				type: "showSuccess",
				text1: "Registrado com sucesso",
				text2: "Bem vindo ao Olho na Gestão! 👀",
				position: "bottom",
			});
			console.log("Registrou");
		}

		if (registerEntity.status === 500) {
			Toast.show({
				type: "showConnection",
				text1: "Sem conexão",
				text2: "Não foi possível autenticar devido a um problema de conexão! 🙁",
				position: "bottom",
			});
			return;
		}

		if (registerEntity.status === 401 || registerEntity.status === 401) {
			Toast.show({
				type: "showError",
				text1: "Credenciais incorretas",
				text2: "❌ Não foi possível criar uma conta! ",
				position: "bottom",
			});
			return;
		}

		sleep(2000);
		const auth = await AuthService.login(data);
		const authEntity = AuthMapper.AuthLogin(auth);

		if (authEntity.status === 200) {
			const data = authEntity.data as IAuthSuccess;
			await database.localStorage.set("auth.access", data.access);
			await database.localStorage.set("auth.refresh", data.refresh);
			await setStorageToken();
		}

		const profile = await AuthService.profile();
		const profileEntity = AuthMapper.AuthProfile(profile);
		if (profileEntity.status === 200) {
			await database.localStorage.set("auth.profile", JSON.stringify(profileEntity.data));
			Toast.show({
				type: "showSuccess",
				text1: "Logado com sucesso",
				text2: "Bem vindo! 👋",
				position: "bottom",
			});
			updateLogin();
		} else {
			await database.localStorage.remove("auth.access");
			await database.localStorage.remove("auth.refresh");
		}

		if (authEntity.status === 500) {
			Toast.show({
				type: "showConnection",
				text1: "Sem conexão",
				text2: "Não foi possível autenticar devido a um problema de conexão! 🙁",
				position: "bottom",
			});
		}

		if (authEntity.status === 401) {
			Toast.show({
				type: "showError",
				text1: "Credenciais incorretas",
				text2: "❌ Não foi possível autenticar devido a credenciais incorretas! ",
				position: "bottom",
			});
		}

		await sleep(2000);
		setLoading(false);
	};

	return {
		control,
		onSubmit,
		handleSubmit,
		showPassword,
		handleTogglePassword,
		loading,
	};
}

export default RegisterViewModel;
