import React from "react";
import { Controller } from "react-hook-form";
import { Text, Image, View as Container, TextInput as Input, TouchableOpacity as Button, ScrollView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AppLogo from "../../../assets/logo/logo.png";
const Logo = Image.resolveAssetSource(AppLogo).uri;

import { useNavigation } from "@react-navigation/native";
import { AuthStackRoutes } from "../../interfaces/routes";
import useKeyboardOpen from "../../hooks/keyboard";
import HeaderBack from "../../components/HeaderBack";
import RegisterViewModel from "./view.model";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterView() {
	const navigator = useNavigation<NativeStackNavigationProp<AuthStackRoutes>>();
	const { control, onSubmit, handleSubmit } = RegisterViewModel();
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
				<Image className="w-40 h-40" source={{ uri: Logo }} />
				<Container>
					<Text className="text-[#00aeed] font-extrabold text-4xl">CRIAR CONTA</Text>
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
										<Container className="w-full">
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Container>
									)}
									<Input
										placeholder="Usuário"
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
							name={"fullName"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Container className="w-full">
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Container>
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
										<Container className="w-full">
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Container>
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
										<Container className="w-full">
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Container>
									)}
									<Input
										placeholder="Senha"
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
							name={"confirmPassword"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Container className="w-full">
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Container>
									)}
									<Input
										placeholder="Confirmar senha"
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
							name={"city"}
							render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
								<>
									{error && (
										<Container className="w-full">
											<Text className="text-red-500 text-start">{error.message}</Text>
										</Container>
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

					{/* <Dropdown
						style={[SelectSearch.dropdown]}
						containerStyle={{ bottom: 35, borderRadius: 10 }}
						placeholderStyle={SelectSearch.placeholderStyle}
						selectedTextStyle={SelectSearch.selectedTextStyle}
						inputSearchStyle={SelectSearch.inputSearchStyle}
						data={city.map((option) => ({ label: `${option.label}`, value: option.id, color: "#000" }))}
						search
						// disable={!params.enableEdit}
						labelField="label"
						valueField="value"
						// placeholder={!isFocus ? "Selecione o sistema..." : "..."}
						searchPlaceholder="Pesquisar..."
						// value={selectedValue}
						// onFocus={() => setIsFocus(true)}
						// onBlur={() => setIsFocus(false)}
						onChange={() => console.log("Mudou")}
					/> */}
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
