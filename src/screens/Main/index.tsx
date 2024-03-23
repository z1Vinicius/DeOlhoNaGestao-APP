import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AppLogo from "../../../assets/logo/logo.png";
import MessageIcon from "../../../assets/icons/message.svg";

import Animated from "react-native-reanimated";
import { FadeIn, FadeOut, FadeInRight, FadeInLeft, FadeOutRight, FadeOutLeft } from "react-native-reanimated";

import { AntDesign } from "@expo/vector-icons";
const Logo = Image.resolveAssetSource(AppLogo).uri;

import { useNavigation } from "@react-navigation/native";
import { AuthStackRoutes } from "../../interfaces/routes";

import MainAuthViewModel from "./view.model";

function HomeView() {
	const navigator = useNavigation<NativeStackNavigationProp<AuthStackRoutes>>();
	const { phrases, isChange } = MainAuthViewModel();

	return (
		<View className="justify-center items-center">
			<View className="p-2 w-full h-3/6">
				<Image className="w-full h-full" source={{ uri: Logo }} />
			</View>

			<View className="w-full h-3/6">
				<View className="w-full h-1/6 justify-center items-center ">
					<Text className="font-bold text-4xl">DE OLHO NA GESTÃO</Text>
				</View>

				<View className="w-5/6 h-40 justify-center items-center m-1 space-y-1">
					{!isChange ? (
						<View className="w-full">
							<Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="w-full flex-row items-center justify-start">
								<SvgXml className="m-3" width="35px" height="35px" xml={MessageIcon} />
								<Text className="text-gray-500 text-base break-words">{phrases[0]}</Text>
							</Animated.View>
							<Animated.View entering={FadeInLeft} exiting={FadeOutRight} className="w-full flex-row items-center justify-start">
								<Text className="text-gray-500 text-base text-nowrap ">{phrases[1]}</Text>
								<SvgXml className="m-3" width="35px" height="35px" xml={MessageIcon} />
							</Animated.View>
						</View>
					) : (
						""
					)}
				</View>

				<View className="m-3 space-y-2">
					<TouchableOpacity
						onPress={() => {
							navigator.navigate("Login");
						}}
						className="bg-[#00aeed] h-12 rounded-xl p-2 justify-center items-center"
						activeOpacity={0.9}
					>
						<View className="w-full h-full flex-row justify-between items-center">
							<View />
							<Text className="text-slate-50 text-lg font-medium">Login</Text>
							<AntDesign name="logout" size={25} color={"white"} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigator.navigate("Register");
						}}
						className="bg-[#00aeed] h-12 rounded-xl p-2 justify-center items-center"
						activeOpacity={0.9}
					>
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
