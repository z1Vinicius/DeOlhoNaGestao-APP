import React from "react";

import { Text, Image, ActivityIndicator as Loader, View as Container, TextInput as Input, TouchableOpacity as Button, KeyboardAvoidingView as ContainerAvoid } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller } from "react-hook-form";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

import AppLogo from "../../../assets/logo/logo.png";
const Logo = Image.resolveAssetSource(AppLogo).uri;
import HeaderBack from "../../components/HeaderBack";

import { useNavigation } from "@react-navigation/native";
import { AuthStackRoutes } from "../../interfaces/routes";
import useKeyboardOpen from "../../hooks/keyboard";

import LoginViewModel from "./view.model";

function LoginView() {
	const navigator = useNavigation<NativeStackNavigationProp<AuthStackRoutes>>();
	const { handleSubmit, control, onSubmit, loading, showPassword, setShowPassword } = LoginViewModel();
	const isKeyboardOpen = useKeyboardOpen();

	return (
		<Container className="items-center  h-full relative">
			<HeaderBack />

			<Container className="w-full p-2 justify-center flex-1">
				<Container className="w-full justify-center items-center">
					<Image className="w-64 h-64" source={{ uri: Logo }} />
				</Container>

				<Container className="w-full p-3 space-y-2">
					<Container>
						<Controller
							control={control}
							name={"username"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Animated.View className="w-full" entering={FadeIn} exiting={FadeOut}>
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Animated.View>
									)}
									<Input
										placeholder="Usuário"
										className="w-full h-12 rounded-2xl border-solid border-gray-500/30 border-2 p-2 text-gray-600"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
									/>
								</>
							)}
						/>
					</Container>

					<Container>
						<Controller
							control={control}
							name={"password"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Animated.View className="w-full" entering={FadeIn} exiting={FadeOut}>
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Animated.View>
									)}

									<Container className="flex-row w-full h-12 rounded-2xl border-solid border-gray-500/30 border-2 justify-between items-center p-2">
										<Input
											placeholder="Senha"
											className="w-4/5 h-12 text-gray-600"
											secureTextEntry={showPassword}
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
										/>
										<Button activeOpacity={0.8} onPress={() => setShowPassword(!showPassword)}>
											{showPassword ? (
												<FontAwesome name={"eye-slash"} size={20} color={"#00aeed"} />
											) : (
												<FontAwesome name={"eye"} size={20} color={"#00aeed"} />
											)}
										</Button>
									</Container>
								</>
							)}
						/>
					</Container>

					<Container className="w-full p-3 space-y-2">
						<Container>
							<Button
								activeOpacity={0.8}
								disabled={loading}
								onPress={handleSubmit(onSubmit)}
								className="bg-[#1aace4] h-12 w-full p-2 justify-center items-center rounded-xl flex-row"
							>
								{loading ? <Loader size="small" color="#FFF" className="mr-2" /> : ""}
								<Text className="text-slate-50 ">Entrar</Text>
							</Button>
						</Container>
						<Container className="w-full justify-center flex-row p-3">
							<Text className="text-zinc-800  font-semibold">Esqueceu sua senha?</Text>
						</Container>
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
