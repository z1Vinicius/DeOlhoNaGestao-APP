import { View as Container, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function PostInteraction() {
	return (
		<Container className="mt-3 flex-row  justify-between">
			<Container className="flex-row gap-2">
				<AntDesign name={"heart"} color={"#21ace1"} size={20} />
				<Text>Curtir</Text>
			</Container>

			<Container className="text-sm">
				<Text>5 pessoas cientes</Text>
			</Container>
		</Container>
	);
}

export default PostInteraction;
