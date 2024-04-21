import { View as Container, TouchableOpacity as Button, Text } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import PostInteraction from "../PostInteraction";
import PostProfile from "../PostProfile";
import PostEdit from "../PostEdit";
import PostText from "../PostText";
import PostMedia from "../PostMedia";

import IPost from "../../interfaces/post";

function Post({ data, profile }: IPost) {
	return (
		<Container className="p-3 m-2 rounded-2xl bg-gray-300">
			<Container className="flex-row gap-2 justify-between items-center">
				<PostProfile name={profile.name} lastName={profile.lastName} createdAt={data.createdAt} profileImage={profile.profileImage} />
				<PostEdit />
			</Container>

			<Container className="mt-2">
				<PostText description={data.description} />
				<PostMedia media={data.media} />
				<PostInteraction />
			</Container>
		</Container>
	);
}

export default Post;
