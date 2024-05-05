interface IPost {
	profile: {
		name: string;
		lastName: string;
		profileImage: string;
		createdBy: string;
	};
	data: {
		id: string;
		createdAt: string;
		updatedAt: string;
		description: string;
		feed_category: string;
		media: string[];
		likes: number;
	};
}

interface IPostFeed {
	feed_category: string;
	updated_at: string;
}

export { IPost, IPostFeed };

export default IPost;
