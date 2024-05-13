import { View as Container, TouchableOpacity as Button, Text } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";

interface IAction {
	open: () => void;
}

function HomePublish({ open }: IAction) {
	return (
		<Container className="flex-row justify-between items-center h-12 m-3 p-3 rounded-full bg-gray-300 ">
			<Container>
				<Button activeOpacity={0.7} className="flex-row items-center gap-2" onPress={open}>
					<Entypo name={"new-message"} color={"#1aace4"} size={20} />
					<Text className="text-zinc-800 font-medium">NOVA PUBLICAÇÃO</Text>
				</Button>
			</Container>

			<Container>
				<Button activeOpacity={0.7} onPress={open}>
					<Feather name={"paperclip"} color={"#1aace4"} size={20} />
				</Button>
			</Container>
		</Container>
	);
}

export default HomePublish;
