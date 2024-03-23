import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

function HeaderBack() {
	const navigator = useNavigation();
	const handleBack = () => {
		navigator.canGoBack() ? navigator.goBack() : "";
	};

	return (
		<TouchableOpacity onPress={() => handleBack()} activeOpacity={0.9} className="h-10 w-full m-3 p-1">
			<AntDesign name="arrowleft" size={28} color={"black"} />
		</TouchableOpacity>
	);
}

export default HeaderBack;
