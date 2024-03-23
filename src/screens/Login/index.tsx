import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

import MessageIcon from "../../../assets/icons/message.svg";
import AppLogo from "../../../assets/logo/logo.png";
const Logo = Image.resolveAssetSource(AppLogo).uri;

import { randomTwoPhrases } from "../../utils/functions";
import stringPhrases from "../../data/messages";

function LoginView() {
	const [phrases, setPhrases] = useState<string[]>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			const randomPhrases = randomTwoPhrases(stringPhrases);
			setPhrases(randomPhrases);
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<View className="justify-center items-center">
			<View className="p-2 w-full h-3/6">
				<Image className="w-full h-full" source={{ uri: Logo }} />
			</View>

			<View className="w-full h-3/6">
				<View className="w-full h-1/6 justify-center items-center ">
					<Text className="font-bold text-4xl">DE OLHO NA GESTÃO2</Text>
				</View>

				<View className="w-5/6 h-40 justify-center items-center m-1">
					<View className="w-full flex-row items-center justify-start">
						<SvgXml className="m-3" width="35px" height="35px" xml={MessageIcon} />
						<Text className="text-gray-500 text-lg break-words">{phrases[0]}</Text>
					</View>
					<View className="w-full flex-row items-center ">
						<Text className="text-gray-500 text-lg text-nowrap ">{phrases[1]}</Text>
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
export default LoginView;
