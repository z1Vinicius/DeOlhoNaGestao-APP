import { Database } from "@nozbe/watermelondb";
import adapter from "./base";
import { PostFeedModel } from "../entities/entities";
import { PostModel } from "../entities/entities";

const database = new Database({
	adapter,
	modelClasses: [PostModel, PostFeedModel],
});

export default database;
