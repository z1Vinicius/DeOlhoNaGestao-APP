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
		text: string;
		media: string[];
		likes: number;
	};
}

export { IPost };

export default IPost;
