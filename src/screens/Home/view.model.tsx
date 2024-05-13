import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { PostRepository, PostFeedRepository } from "src/db/infra/db/repositories/post.repository";
import { PostModel } from "src/db/infra/db/entities/entities";
import useStore from "src/stores/feed";
import { IPostActionChooseRef } from "@components/PostActionSheet";

function HomeViewModel() {
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [isLoading, setLoading] = useState<boolean>(true);
	const receiveEvent = useStore((state) => state.eventCounter);
	const createPost = useRef<IPostActionChooseRef>(null);

	const handleLoadFeed = async () => {
		try {
			const data = await PostFeedRepository.getRecentFeed();
			const request = await api.post("api/posts/feed/update", data);
			await PostRepository.loadManyPosts(request.data.data);
			await PostFeedRepository.createOrUpdateBasedOnExistence(request.data);
			await handleLoadPosts();
		} catch {
		} finally {
		}
	};

	const handleLoadPosts = async () => {
		setLoading(true);
		setPosts(await PostRepository.fetchAllData());
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	useEffect(() => {
		handleLoadPosts();
	}, [receiveEvent]);

	useEffect(() => {
		handleLoadPosts();
		handleLoadFeed();
		return () => {};
	}, []);

	return {
		isLoading,
		posts,
		handleLoadFeed,
		handleLoadPosts,
		createPost,
	};
}

export default HomeViewModel;
