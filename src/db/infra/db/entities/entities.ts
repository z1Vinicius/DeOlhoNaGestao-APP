import { field, json, date, readonly } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

const serializeJson = (json) => json;

export class PostModel extends Model {
	static table = "Post";

	@field("uuid")
	uuid!: string;

	@field("profile_image")
	profile_image!: string;

	@field("name")
	name!: string;

	@field("hasLike")
	hasLike!: boolean;

	@field("last_name")
	last_name!: string;

	@field("created_by")
	created_by!: string;

	@field("created_at")
	created_at!: number;

	@field("updated_at")
	updated_at!: number;

	@field("likes")
	likes!: number;

	@field("description")
	description!: string;

	@field("feed_category")
	feed_category!: string;

	@json("media", serializeJson)
	media!: string[];
}

export class PostFeedModel extends Model {
	static table = "Feed";

	@field("updated_at")
	updated_at!: number;

	@field("feed_category")
	feed_category!: string;
}
