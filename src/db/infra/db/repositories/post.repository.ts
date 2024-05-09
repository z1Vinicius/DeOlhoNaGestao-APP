import { Q } from "@nozbe/watermelondb";
import { Alert } from "react-native";

import database from "../settings/connection";
import { PostFeedModel, PostModel } from "../entities/entities";
import { IPost, IPostFeed } from "src/interfaces/post";
const dayjs = require("dayjs");

export class PostRepository {
	static async getBase() {
		return database.get<PostModel>(PostModel.table);
	}

	static async fetchAllData() {
		const base = await this.getBase();
		const response = await base.query().fetch();
		return response;
	}

	static async deleteAllRecords() {
		await database.write(async () => {
			const fetchAll = await this.fetchAllData();
			const queryDelete = fetchAll.map((raw) => raw.prepareDestroyPermanently());
			database.batch(queryDelete);
		});
	}

	static async hasTableRecords(): Promise<boolean> {
		const base = await this.getBase();
		const hasRecords = (await base.query(Q.take(1))).length;
		if (hasRecords) {
			return true;
		}
		return false;
	}

	static async getAllPostIds() {
		const data = await this.fetchAllData();
		return data.map((post) => post.uuid);
	}

	static async checkPostExist(uuid: string): Promise<boolean> {
		const base = await this.getBase();
		const [result] = await base.query(Q.where("uuid", uuid));
		return Boolean(result);
	}

	static async loadManyPosts(postData: IPost[]) {
		try {
			const base = await this.getBase();
			const posts = await this.getAllPostIds();
			const filteredData = postData.filter((element) => !posts.includes(element?.data.id as string));

			const datas = filteredData.map((element) =>
				base.prepareCreate((data) => {
					data.uuid = element.data.id || "";
					data.created_at = Date.parse(element.data.createdAt as string);
					data.updated_at = Date.parse(element.data.updatedAt as string);
					data.likes = element.data.likes || 0;
					data.media = element.data.media;
					data.description = element.data.description;
					data.name = element.profile.name;
					data.last_name = element.profile.lastName;
					data.profile_image = element.profile.profileImage;
					data.feed_category = element.data.feed_category;
				})
			);
			await database.write(async () => {
				await database.batch([...datas]);
			});
			return true;
		} catch (error) {}
		return false;
	}

	static async updatePost(postData: IPost) {
		try {
			const base = await this.getBase();
			const [result] = await base.query(Q.where("uuid", postData.data.id || ""));
			const queryUpdate = result.prepareUpdate((data) => {
				data.updated_at = Date.parse(postData.data.updatedAt as string);
				data.likes = postData.data.likes || 0;
				data.media = postData.data.media;
				data.description = postData.data.description;
				data.name = postData.profile.name;
				data.last_name = postData.profile.lastName;
				data.profile_image = postData.profile.profileImage;
			});
			await database.write(async () => {
				await database.batch([queryUpdate]);
			});
			return true;
		} catch {}
	}

	static async createPost(postData: IPost) {
		try {
			const base = await this.getBase();
			const post = base.prepareCreate((data) => {
				data.uuid = postData.data.id || "";
				data.created_at = Date.parse(postData.data.createdAt as string);
				data.updated_at = Date.parse(postData.data.updatedAt as string);
				data.likes = postData.data.likes || 0;
				data.media = postData.data.media;
				data.description = postData.data.description;
				data.name = postData.profile.name;
				data.last_name = postData.profile.lastName;
				data.profile_image = postData.profile.profileImage;
				data.feed_category = postData.data.feed_category;
			});

			await database.write(async () => {
				await database.batch([post]);
			});
			return true;
		} catch {}
	}

	static async deletePost(uuid: string) {
		try {
			const base = await this.getBase();
			const hasPost = await this.checkPostExist(uuid);
			if (!hasPost) {
				return;
			}
			const [result] = await base.query(Q.where("uuid", uuid));
			const queryDelete = result.prepareDestroyPermanently();
			await database.write(async () => {
				await database.batch([queryDelete]);
			});
			return true;
		} catch {}
	}

	static async createOrUpdateBasedOnExistence(uuid: string, postData: IPost): Promise<boolean> {
		const postExist = await PostRepository.checkPostExist(uuid);
		if (!postExist) {
			await PostRepository.createPost(postData);
			return true;
		}
		await PostRepository.updatePost(postData);
		return true;
	}

	static async createObserver() {
		return (await this.getBase()).query().observe();
	}

	static async forceReloadObservers() {
		const randomUUID = "a845151e-ba5b-4a3e-858d-b279cf91b5c7";
		try {
			const base = await this.getBase();
			const form = base.prepareCreate((data) => {
				data.uuid = randomUUID;
			});
			await database.write(async () => {
				await database.batch([form]);
			});
			await this.deletePost(randomUUID);
			return true;
		} catch {}
	}
}

export class PostFeedRepository {
	static async getBase() {
		return database.get<PostFeedModel>(PostFeedModel.table);
	}

	static async fetchRecentFeed() {
		const base = await this.getBase();
		const response = await base.query(Q.where("feed_category", Q.notEq("")), Q.where("feed_category", Q.notEq(null)), Q.sortBy("updated_at", Q.desc), Q.take(50)).fetch();
		return response;
	}

	static async fetchAllData() {
		const base = await this.getBase();
		const response = await base.query().fetch();
		return response;
	}

	static async deleteAllRecords() {
		await database.write(async () => {
			const fetchAll = await this.fetchAllData();
			const queryDelete = fetchAll.map((raw) => raw.prepareDestroyPermanently());
			database.batch(queryDelete);
		});
	}

	static async hasTableRecords(): Promise<boolean> {
		const base = await this.getBase();
		const hasRecords = (await base.query(Q.take(1))).length;
		if (hasRecords) {
			return true;
		}
		return false;
	}

	static async checkFeedExist(feedCategory: string): Promise<boolean> {
		const base = await this.getBase();
		const [result] = await base.query(Q.where("feed_category", feedCategory));
		return Boolean(result);
	}

	static async updateFeed(feed: IPostFeed) {
		try {
			const base = await this.getBase();
			const [result] = await base.query(Q.where("feed_category", feed.feed_category || ""));
			const queryUpdate = result.prepareUpdate((data) => {
				data.feed_category = feed.feed_category;
				data.updated_at = Date.parse(feed.updated_at as string);
			});
			await database.write(async () => {
				await database.batch([queryUpdate]);
			});
			return true;
		} catch {}
	}

	static async createFeed(feed: IPostFeed) {
		try {
			console.log(feed.feed_category, feed.updated_at);
			const base = await this.getBase();
			const feedCreate = base.prepareCreate((data) => {
				data.feed_category = feed.feed_category || "";
				data.updated_at = Date.parse(feed.updated_at as string);
			});

			await database.write(async () => {
				await database.batch([feedCreate]);
			});
			return true;
		} catch {}
	}

	static async deletePost(feedCategory: string) {
		try {
			const base = await this.getBase();
			const hasFeed = await this.checkFeedExist(feedCategory);
			if (!hasFeed) {
				return;
			}
			const [result] = await base.query(Q.where("feed_category", feedCategory));
			const queryDelete = result.prepareDestroyPermanently();
			await database.write(async () => {
				await database.batch([queryDelete]);
			});
			return true;
		} catch {}
	}

	static async createOrUpdateBasedOnExistence(feedCategory: IPostFeed): Promise<boolean> {
		const postExist = await PostFeedRepository.checkFeedExist(feedCategory.feed_category);
		if (!postExist) {
			await PostFeedRepository.createFeed(feedCategory);
			return true;
		}
		await PostFeedRepository.updateFeed(feedCategory);
		return true;
	}

	static async getRecentFeed() {
		const base = await PostFeedRepository.fetchRecentFeed();
		const object: { categories: { feed_category: string; last_update: string }[] } = { categories: [] };
		base.forEach((element) => {
			object.categories.push({
				feed_category: element.feed_category,
				last_update: dayjs(new Date(element.updated_at)).format("YYYY-MM-DD HH:mm:ss.SSSSSS"),
			});
		});
		return object;
	}
}
