import { appSchema } from "@nozbe/watermelondb";
import { tableSchema } from "@nozbe/watermelondb";

const schemas = appSchema({
	version: 2,
	tables: [
		tableSchema({
			name: "profile",
			columns: [
				{ name: "uuid", type: "string" },
				{ name: "name", type: "string" },
				{ name: "last_name", type: "string" },
				{ name: "username", type: "string" },
				{ name: "email", type: "string" },
				{ name: "profile_image", type: "string" },
			],
		}),
		tableSchema({
			name: "Post",
			columns: [
				{ name: "uuid", type: "string" },
				{ name: "created_at", type: "number" },
				{ name: "updated_at", type: "number" },
				{ name: "created_by", type: "string" },
				{ name: "likes", type: "number" },
				{ name: "hasLike", type: "boolean" },
				{ name: "media", type: "string" },
				{ name: "description", type: "string" },
				{ name: "name", type: "string" },
				{ name: "last_name", type: "string" },
				{ name: "profile_image", type: "string" },
				{ name: "feed_category", type: "string" },
			],
		}),
		tableSchema({
			name: "Feed",
			columns: [
				{ name: "feed_category", type: "string" },
				{ name: "updated_at", type: "number" },
			],
		}),
	],
});

export default schemas;
