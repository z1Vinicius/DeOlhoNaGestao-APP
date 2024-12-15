import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { useMemo } from "react";
import { TouchableOpacity as Button, View as Container, Text } from "react-native";
import { nameToColor } from "../../utils/functions";
interface IPostProfile {
	name: string;
	lastName: string;
	profileImage: string;
	createdAt: string;
}
const dayjs = require("dayjs");

function PostProfile({ name, lastName, profileImage, createdAt }: IPostProfile) {
	const fullName = `${name} ${lastName}`;
	const postDate = useMemo(() => dayjs(createdAt).format("DD/MM/YYYY"), [createdAt]);

	return (
		<Container className="flex-row gap-2 p-2">
			<Button activeOpacity={0.9}>
				<Avatar style={{ backgroundColor: nameToColor(name, lastName), borderRadius: 100 }} size="md" borderRadius="$full">
					<AvatarFallbackText color="$black">{fullName}</AvatarFallbackText>
				</Avatar>
			</Button>
			<Container className="flex-col">
				<Text className="text-lg text-zinc-900 font-medium">{fullName}</Text>
				<Text className="text-black">{postDate}</Text>
			</Container>
		</Container>
	);
}

export default PostProfile;
