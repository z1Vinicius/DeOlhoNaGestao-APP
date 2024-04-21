import { TouchableOpacity as Button, View as Container } from "react-native";

function PostMedia() {
	return (
		<Container className="gap-2 flex-row mt-2">
			<Button className="bg-cyan-500 w-20 h-20 rounded-lg"></Button>
			<Button className="bg-cyan-600 w-20 h-20 rounded-lg"></Button>
			<Button className="bg-cyan-700 w-20 h-20 rounded-lg"></Button>
		</Container>
	);
}

export default PostMedia;
