import { View as Container, Text } from "react-native";

interface IPostText {
	description: string;
}

function PostText({ description }: IPostText) {
	return (
		<Container className="mb-1">
			<Text className="text-zinc-900 text-base">{description}</Text>
		</Container>
	);
}

export default PostText;
