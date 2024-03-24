import { BaseToast, ErrorToast } from "react-native-toast-message";
import { View, Text, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";

const CustomToastConfig = {
	showSuccess: ({ text1, text2 }) => (
		<View className="w-screen" style={stylesItem}>
			<View className="m-3 flex-col items-start justify-between bg-slate-50 rounded-md bg-clip-padding backdrop-filter blur-1xl backdrop-blur-sm">
				<View className="p-3">
					<Text className="font-semibold text-base">{text1}</Text>
					<Text className="font-light text-sm">{text2}</Text>
				</View>
				<View className="w-full h-2 bg-[#00adec]" />
			</View>
		</View>
	),

	showConnection: ({ text1, text2 }) => (
		<View className="w-screen" style={stylesItem}>
			<View className="m-3 flex-col items-start justify-between bg-slate-50 rounded-md bg-clip-padding backdrop-filter blur-1xl backdrop-blur-sm">
				<View className="p-3">
					<Text className="font-semibold text-base">{text1}</Text>
					<Text className="font-light text-sm">{text2}</Text>
				</View>
				<View className="w-full h-2 bg-yellow-400" />
			</View>
		</View>
	),

	showError: ({ text1, text2 }) => (
		<View className="w-screen" style={stylesItem}>
			<View className="m-3 flex-col items-start justify-between bg-slate-50 rounded-md bg-clip-padding backdrop-filter blur-1xl backdrop-blur-sm">
				<View className="p-3">
					<Text className="font-semibold text-base">{text1}</Text>
					<Text className="font-light text-sm">{text2}</Text>
				</View>
				<View className="w-full h-2 bg-red-500" />
			</View>
		</View>
	),
};

export default CustomToastConfig;

const stylesItem: ViewStyle = {
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 3,
	},
	shadowOpacity: 0.34,
	shadowRadius: 3.27,

	elevation: 4,
};
