import { TouchableOpacity as Button } from "react-native";
import { Feather } from "@expo/vector-icons";

function PostEdit() {
	return (
		<Button>
			<Feather name={"more-vertical"} size={20} color={"#262626"} />
		</Button>
	);
}

export default PostEdit;
