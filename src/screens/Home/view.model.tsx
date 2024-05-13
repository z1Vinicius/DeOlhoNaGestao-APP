import { useState, useEffect } from "react";
import api from "../../services/api";
import { PostRepository, PostFeedRepository } from "src/db/infra/db/repositories/post.repository";
import { PostModel } from "src/db/infra/db/entities/entities";
import useStore from "src/stores/feed";

function HomeViewModel() {
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const receiveEvent = useStore((state) => state.eventCounter);

	const handleLoadFeed = async () => {
		try {
			setLoading(true);
			const data = await PostFeedRepository.getRecentFeed();
			const request = await api.post("api/posts/feed/update", data);
			await PostRepository.loadManyPosts(request.data.data);
			await PostFeedRepository.createOrUpdateBasedOnExistence(request.data);
			await handleLoadPosts();
		} catch {
		} finally {
			setLoading(false);
		}
	};

	const handleLoadPosts = async () => {
		setPosts(await PostRepository.fetchAllData());
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
	};
}

export default HomeViewModel;
