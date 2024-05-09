import api from "../../services/api";
import { useEffect, useState } from "react";
import { PostRepository, PostFeedRepository } from "src/db/infra/db/repositories/post.repository";
import { PostModel } from "src/db/infra/db/entities/entities";

function HomeViewModel() {
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);

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
