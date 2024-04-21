import React from "react";
import { TouchableOpacity as Button, View as Container, Image, FlatList } from "react-native";
import { url } from "../../services/api";

interface IPostMedia {
	media: string[];
}

function PostMedia({ media }: IPostMedia) {
	const MediaItem = ({ item }) => {
		return <Image source={{ uri: url + item }} className="h-32 w-32 mr-2 rounded-xl" />;
	};

	return (
		<Container className="mt-2 mb-2">
			<FlatList horizontal data={media} keyExtractor={(item) => item} renderItem={({ item }) => <MediaItem item={item} />} />
		</Container>
	);
}

export default PostMedia;
