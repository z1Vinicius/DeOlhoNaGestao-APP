import HomeHeader from "../../components/HomeHeader";
import HomePublish from "../../components/HomePublish";
import Post from "../../components/Post";

import { View as Container, FlatList } from "react-native";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { map } from "zod";

import { PostRepository, PostFeedRepository } from "src/db/infra/db/repositories/post.repository";
function HomePage() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function getUserPosts() {
			const request = await api.get("api/posts/feed/update");
			setPosts(request.data.data);
			await PostRepository.loadManyPosts(request.data.data);
			await PostFeedRepository.createOrUpdateBasedOnExistence(request.data);
		}

		getUserPosts();
		return () => {};
	}, []);

	return (
		<Container>
			<HomeHeader />
			<HomePublish />
			{posts.length > 0 ? <FlatList data={posts} keyExtractor={(item) => item.data.id} renderItem={({ item }) => <Post data={item.data} profile={item.profile} />} /> : ""}
		</Container>
	);
}

{
	/* <Post
data={{
	createdAt: "2024-05-21 15:22:33",
	updatedAt: "2024-05-21 00:00:00",
	id: "12121-121212-1212-1212",
	likes: 20,
	media: ["/media/post_media/image_1.png", "/media/post_media/image_2.png", "/media/post_media/image_3.png"],
	description: "Buceta 123",
}}
profile={{
	createdBy: "12121-1212-1212-121212-121212",
	lastName: "Silva",
	name: "Veneceos",
	profileImage: "12121212",
}} */
}

export default HomePage;
