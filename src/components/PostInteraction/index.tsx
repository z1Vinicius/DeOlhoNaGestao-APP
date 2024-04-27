import { View as Container, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface IPostInteraction {
	likes: number;
	hasLike: boolean;
}

function PostInteraction({ likes, hasLike }: IPostInteraction) {
	return (
		<Container className="mt-3 flex-row  justify-between">
			<Container className="flex-row gap-2">
				<AntDesign name={"heart"} color={"#21ace1"} size={20} />
				{hasLike ? <Text>Descurtir</Text> : <Text>Curtir</Text>}
			</Container>

			<Container className="text-sm">
				<Text>{likes} pessoas cientes</Text>
			</Container>
		</Container>
	);
}

export default PostInteraction;
