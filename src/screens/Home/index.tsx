import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

import AppLogo from "../../../assets/logo/logo.png";
import MessageIcon from "../../../assets/icons/message.svg";

import { AntDesign, Ionicons } from "@expo/vector-icons";

const Logo = Image.resolveAssetSource(AppLogo).uri;

function HomeView() {
	return (
		<View className="justify-center items-center">
			<View className="p-2 w-full h-3/6">
				<Image className="w-full h-full" source={{ uri: Logo }} />
			</View>

			<View className="w-full h-3/6">
				<View className="w-full h-1/6 justify-center items-center ">
					<Text className="font-bold text-4xl">DE OLHO NA GESTÃO</Text>
				</View>

				<View className="w-full">
					<View className="w-full flex-row items-center justify-start">
						<SvgXml className="m-3" width="35px" height="35px" xml={MessageIcon} />
						<Text className="text-gray-500 text-lg">Falta de Acessibilidade na rua....</Text>
					</View>
					<View className="w-full flex-row items-center justify-end">
						<Text className="text-gray-500 text-lg">Falta de Acessibilidade na rua....</Text>
						<SvgXml className="m-3" width="35px" height="35px" xml={MessageIcon} />
					</View>
				</View>

				<View className="m-3 space-y-2">
					<TouchableOpacity className="bg-[#00aeed] h-12 rounded-xl p-2 justify-center items-center" activeOpacity={0.9}>
						<View className="w-full h-full flex-row justify-between items-center">
							<View />
							<Text className="text-slate-50 text-lg font-medium">Login</Text>
							<AntDesign name="logout" size={25} color={"white"} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity className="bg-[#00aeed] h-12 rounded-xl p-2 justify-center items-center" activeOpacity={0.9}>
						<View className="w-full h-full flex-row justify-between items-center">
							<View />
							<Text className="text-slate-50 text-lg font-medium">Registrar</Text>
							<AntDesign name="plussquare" size={25} color={"white"} />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
export default HomeView;
