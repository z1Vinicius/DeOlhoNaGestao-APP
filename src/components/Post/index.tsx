import { View as Container } from "react-native";

import PostEdit from "../PostEdit";
import PostInteraction from "../PostInteraction";
import PostMedia from "../PostMedia";
import PostProfile from "../PostProfile";
import PostText from "../PostText";

import { PostModel } from "src/db/infra/db/entities/entities";

interface IPost {
	data: PostModel;
	userId: string;
}

function Post({ data, userId }: IPost) {
	return (
		<Container className="p-3 m-2 rounded-2xl bg-gray-300">
			<Container className="flex-row gap-2 justify-between items-center">
				<PostProfile name={data?.name} lastName={data.last_name} createdAt={new Date(data.created_at).toDateString()} profileImage={data.profile_image} />
				<PostEdit createdBy={data.created_by} postId={data.uuid} userId={userId} />
			</Container>

			<Container className="mt-2">
				<PostText description={data?.description} />
				<PostMedia media={data?.media} />
				<PostInteraction hasLike={data.hasLike} likes={data.likes} postId={data.uuid} />
			</Container>
		</Container>
	);
}

export default Post;
