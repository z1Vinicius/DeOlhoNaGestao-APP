import React from "react";

import { Text, Image, View as Container, TextInput as Input, TouchableOpacity as Button, ViewStyle, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AppLogo from "../../../assets/logo/logo.png";
const Logo = Image.resolveAssetSource(AppLogo).uri;

import { useNavigation } from "@react-navigation/native";
import { AuthStackRoutes } from "../../interfaces/routes";
import useKeyboardOpen from "../../hooks/keyboard";
import HeaderBack from "../../components/HeaderBack";
import { Dropdown } from "react-native-searchable-dropdown-kj";

function LoginView() {
	const navigator = useNavigation<NativeStackNavigationProp<AuthStackRoutes>>();
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
				<Container className="w-full p-3 space-y-2">
					<Input className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600" placeholder="Usuário" />
					<Input className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600" placeholder="Nome Completo" />
					<Input className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600" placeholder="E-mail" />
					<Input className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600" secureTextEntry={true} placeholder="Senha" />
					<Input className="w-full h-12  rounded-2xl border-solid border-gray-500/30 border-2 p-3 text-gray-600" secureTextEntry={true} placeholder="Confirmar Senha" />
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
						<Button className="bg-[#1aace4] h-12 w-full p-2 justify-center items-center rounded-xl">
							<Text className="text-slate-50 ">Registrar</Text>
						</Button>
					</Container>
				</Container>
			</Container>

			{!isKeyboardOpen ? (
				<Container className="absolute bottom-0 bg-gray-200 h-12 w-full flex-row p-3 justify-center items-center space-x-2 m-3 ">
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
export default LoginView;

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
