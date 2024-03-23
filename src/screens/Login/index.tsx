import React from "react";

import { Text, Image, ActivityIndicator as Loader, View as Container, TextInput as Input, TouchableOpacity as Button, KeyboardAvoidingView as ContainerAvoid } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AppLogo from "../../../assets/logo/logo.png";
const Logo = Image.resolveAssetSource(AppLogo).uri;
import HeaderBack from "../../components/HeaderBack";

import { useNavigation } from "@react-navigation/native";
import { AuthStackRoutes } from "../../interfaces/routes";
import useKeyboardOpen from "../../hooks/keyboard";
import { AntDesign } from "@expo/vector-icons";

import LoginViewModel from "./view.model";

function LoginView() {
	const navigator = useNavigation<NativeStackNavigationProp<AuthStackRoutes>>();
	const { password, setPassword, username, setUsername, isLoading, handleLogin } = LoginViewModel();
	const isKeyboardOpen = useKeyboardOpen();

	return (
		<Container className="items-center  h-full relative">
			<HeaderBack />

			<Container className="w-full p-2 justify-center flex-1">
				<Container className="w-full justify-center items-center">
					<Image className="w-64 h-64" source={{ uri: Logo }} />
				</Container>

				<Container className="w-full p-3 space-y-2">
					<Input
						className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-2 text-gray-600"
						placeholder="Usuário"
						value={username}
						onChangeText={setUsername}
						placeholderTextColor={"#4f4f53"}
						// autoFocus={true}
						secureTextEntry={true}
					/>
					<Input
						className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-2 text-gray-600"
						placeholder="Senha"
						value={password}
						onChangeText={setPassword}
						placeholderTextColor={"#4f4f53"}
						secureTextEntry={true}
					/>

					<Container>
						<Button
							activeOpacity={0.8}
							disabled={isLoading}
							onPress={async () => {
								await handleLogin();
							}}
							className="bg-[#1aace4] h-12 w-full p-2 justify-center items-center rounded-xl flex-row"
						>
							{isLoading ? <Loader size="small" color="#FFF" className="mr-2" /> : ""}
							<Text className="text-slate-50 ">Entrar</Text>
						</Button>
					</Container>
					<Container className="w-full justify-center flex-row p-3">
						<Text className="text-zinc-800  font-semibold">Esqueceu sua senha?</Text>
					</Container>
				</Container>
			</Container>

			{!isKeyboardOpen ? (
				<Container className=" bottom-0 bg-gray-200 h-12 w-full flex-row p-3 justify-center items-center space-x-2 m-3 ">
					<Text className="text-zinc-700 ">Não tem uma conta?</Text>
					<Button
						activeOpacity={0.8}
						onPress={() => {
							navigator.replace("Register");
						}}
					>
						<Text className="text-zinc-700 font-bold">Cadastra-se</Text>
					</Button>
				</Container>
			) : (
				""
			)}
		</Container>
	);
}
export default LoginView;
