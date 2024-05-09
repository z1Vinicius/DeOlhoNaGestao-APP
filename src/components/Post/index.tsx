import { View as Container, TouchableOpacity as Button, Text } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import PostInteraction from "../PostInteraction";
import PostProfile from "../PostProfile";
import PostEdit from "../PostEdit";
import PostText from "../PostText";
import PostMedia from "../PostMedia";

import { PostModel } from "src/db/infra/db/entities/entities";

interface IPost {
	data: PostModel;
}

function Post({ data }: IPost) {
	return (
		<Container className="p-3 m-2 rounded-2xl bg-gray-300">
			<Container className="flex-row gap-2 justify-between items-center">
				<PostProfile name={data?.name} lastName={data.last_name} createdAt={new Date(data.created_at).toDateString()} profileImage={data.profile_image} />
				<PostEdit />
			</Container>

			<Container className="mt-2">
				<PostText description={data?.description} />
				<PostMedia media={data?.media} />
				<PostInteraction hasLike={false} likes={data.likes} />
			</Container>
		</Container>
	);
}

export default Post;
