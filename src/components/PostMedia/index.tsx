import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { TouchableOpacity as Button, View as Container, Image } from "react-native";
import { url } from "../../services/api";

interface IPostMedia {
	media: string[];
}

function PostMedia({ media }: IPostMedia) {
	useEffect(() => {
		// console.log("Renderizou", new Date().toString());
	}, []);

	const MediaItem = ({ item }) => {
		return (
			<Container className="h-96 w-full">
				<Button activeOpacity={0.9}>
					<Image source={{ uri: url + item }} className="h-full w-64 mr-2 rounded-xl" />
				</Button>
			</Container>
		);
	};

	return (
		<Container className="mt-2 mb-2">
			{media.length > 0 ? (
				<FlashList
					horizontal={true}
					renderItem={({ item }) => {
						return <MediaItem item={item} />;
					}}
					getItemType={(item) => {
						return Math.random();
					}}
					data={media}
					estimatedItemSize={25}
				/>
			) : (
				""
			)}
			{/* <FlatList horizontal data={media} keyExtractor={(item) => item + Math.random()} renderItem={({ item }) => <MediaItem item={item} />} /> */}
		</Container>
	);
}

export default PostMedia;
