import { View as Container, TouchableOpacity as Button, Text } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import PostInteraction from "../PostInteraction";
import PostProfile from "../PostProfile";
import PostEdit from "../PostEdit";
import PostText from "../PostText";
import PostMedia from "../PostMedia";

function Post() {
	return (
		<Container className="p-3 m-2 rounded-2xl bg-gray-300">
			<Container className="flex-row gap-2 justify-between items-center">
				<PostProfile />
				<PostEdit />
			</Container>

			<Container className="mt-2">
				<PostText />
				<PostMedia />
				<PostInteraction />
			</Container>
		</Container>
	);
}

export default Post;
