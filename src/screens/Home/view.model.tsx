import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { PostRepository, PostFeedRepository } from "src/db/infra/db/repositories/post.repository";
import { PostModel } from "src/db/infra/db/entities/entities";
import useStore from "src/stores/feed";
import { IPostActionChooseRef } from "@components/PostActionSheet";
import database from "src/db/infra/db/settings/connection";
import { IAuthProfile } from "src/interfaces/auth";

function HomeViewModel() {
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [userId, setUserId] = useState();
	const receiveEvent = useStore((state) => state.eventCounter);
	const createPost = useRef<IPostActionChooseRef>(null);

	useEffect(() => {
		const getName = async () => {
			const data = (await database.localStorage.get("auth.profile")) as string;
			if (data) {
				const parse = JSON.parse(data) as IAuthProfile["data"];
				setUserId(parse.id);
			}
		};
		getName();
	}, []);

	const handleLoadFeed = async () => {
		try {
			if (!isLoading) {
				setLoading(true);
				const data = await PostFeedRepository.getRecentFeed();
				const request = await api.post("api/posts/feed/update", data);
				await PostRepository.loadManyPosts(request.data.data);
				await PostFeedRepository.createOrUpdateBasedOnExistence(request.data);
				await handleLoadPosts();
			}
		} catch {
			// setTimeout(async () => {
			// 	await handleLoadFeed();
			// }, 5000);
		} finally {
			setLoading(false);
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
		userId,
		handleLoadFeed,
		handleLoadPosts,
		createPost,
	};
}

export default HomeViewModel;
