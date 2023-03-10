import type { CollectionEntry } from "astro:content";

type Markdown = CollectionEntry<"post">[] | CollectionEntry<"journal">[];

export function sortMDByDate(posts: Markdown = []) {
	return posts.sort(
		(a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
	);
}

export function getUniqueTags(posts: Markdown = []) {
	const uniqueTags = new Set<string>();
	posts.forEach(({ data: { tags } }) => {
		tags.map((tag) => uniqueTags.add(tag));
	});
	return Array.from(uniqueTags);
}

export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[] = []): {
	[key: string]: number;
} {
	return posts.reduce((prev, { data: { tags } }) => {
		const runningTags: { [key: string]: number } = { ...prev };
		tags.forEach((tag) => {
			runningTags[tag] = (runningTags[tag] || 0) + 1;
		});
		return runningTags;
	}, {});
}
