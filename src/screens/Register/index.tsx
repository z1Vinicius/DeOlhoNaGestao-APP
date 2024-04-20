import React from "react";
import { Controller } from "react-hook-form";
import { Text, Image, View as Container, TextInput as Input, TouchableOpacity as Button, ScrollView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

import AppLogo from "../../../assets/logo/logo.png";
const Logo = Image.resolveAssetSource(AppLogo).uri;

import { useNavigation } from "@react-navigation/native";
import { AuthStackRoutes } from "../../interfaces/routes";
import useKeyboardOpen from "../../hooks/keyboard";
import HeaderBack from "../../components/HeaderBack";
import RegisterViewModel from "./view.model";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

function RegisterView() {
	const navigator = useNavigation<NativeStackNavigationProp<AuthStackRoutes>>();
	const { control, onSubmit, handleSubmit, showPassword, handleTogglePassword } = RegisterViewModel();
	const isKeyboardOpen = useKeyboardOpen();
	const city = [
		{
			label: "Recife",
			id: "recife",
		},
	];

	return (
		<Container className="justify-start h-full relative">
			<HeaderBack />
			<Container className="w-full justify-center items-center flex-row">
				<Image className="w-36 h-36" source={{ uri: Logo }} />
				<Container>
					<Text className="text-[#00aeed] font-extrabold text-3xl">CRIAR CONTA</Text>
					<Text className="text-zinc-900 font-extrabold text-xl">DE OLHO NA GESTÃO</Text>
				</Container>
			</Container>
			<Container className="w-full p-2 justify-center items-center ">
				<ScrollView className="w-full p-3 space-y-2">
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
										className="w-full h-12 rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600"
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
							name={"fullName"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Animated.View className="w-full" entering={FadeIn} exiting={FadeOut}>
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Animated.View>
									)}
									<Input
										placeholder="Nome Completo"
										className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600"
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
							name={"email"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Animated.View className="w-full" entering={FadeIn} exiting={FadeOut}>
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Animated.View>
									)}
									<Input
										placeholder="Email"
										className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600"
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
											secureTextEntry={showPassword.password}
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
										/>
										<Button activeOpacity={0.8} onPress={() => handleTogglePassword("password")}>
											{showPassword.password ? (
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

					<Container>
						<Controller
							control={control}
							name={"confirmPassword"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Animated.View className="w-full" entering={FadeIn} exiting={FadeOut}>
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Animated.View>
									)}
									<Container className="flex-row w-full h-12 rounded-2xl border-solid border-gray-500/30 border-2 justify-between items-center p-2">
										<Input
											placeholder="Confirmar senha"
											className="w-4/5 h-12 text-gray-600"
											secureTextEntry={showPassword.confirmPassword}
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
										/>
										<Button activeOpacity={0.8} onPress={() => handleTogglePassword("confirmPassword")}>
											{showPassword.confirmPassword ? (
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

					<Container>
						<Controller
							control={control}
							name={"city"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Animated.View className="w-full" entering={FadeIn} exiting={FadeOut}>
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Animated.View>
									)}
									<Input
										placeholder="Recife (Pernambuco)"
										className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
									/>
								</>
							)}
						/>
					</Container>
					<Container className="w-full">
						<Button activeOpacity={0.8} onPress={handleSubmit(onSubmit)} className="bg-[#1aace4] h-12 w-full p-2 justify-center items-center rounded-xl">
							<Text className="text-slate-50">Registrar</Text>
						</Button>
					</Container>
				</ScrollView>
			</Container>

			{!isKeyboardOpen ? (
				<Container className="absolute bottom-0 bg-gray-200 h-12 w-full flex-row p-3 justify-center items-center space-x-2 mb-3 ">
					<Text className="text-zinc-700 ">Já possuí uma conta?</Text>
					<Button
						activeOpacity={0.8}
						onPress={() => {
							navigator.replace("Login");
						}}
					>
						<Text className="text-zinc-700 font-bold">Entrar</Text>
					</Button>
				</Container>
			) : (
				""
			)}
		</Container>
	);
}
export default RegisterView;

export const SelectSearch = StyleSheet.create({
	container: {
		backgroundColor: "#f5f5f5",
		opacity: 0.5,
		padding: 2,
		borderRadius: 10,
	},
	dropdown: {
		position: "absolute",
		flex: 1,
		flexDirection: "column",
		width: "100%",
		borderColor: "gray",
		borderRadius: 10,
		paddingHorizontal: 8,
	},
	item: {
		backgroundColor: "red",
		padding: 17,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	icon: {
		marginRight: 5,
		padding: 5,
		display: "none",
	},
	selectedTextStyle: {
		fontSize: 15,
		marginLeft: 8,
		borderRadius: 15,
	},
	label: {
		backgroundColor: "#f5f5f5",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 10,
	},
	placeholderStyle: {
		fontSize: 14,
		color: "gray",
	},
	inputSearchStyle: {
		height: 35,
		borderRadius: 10,
		borderColor: "#f0f1f1",
		fontSize: 17,
	},
});
