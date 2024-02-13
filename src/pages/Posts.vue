<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { Post } from "@/types/posts.ts"
import {
	getPostsList,
	editPostTitle as editPostTitleApi,
	deletePost as deletePostApi,
} from "@/api/posts.ts"
import PostList from "@/components/List.vue"
import PageTitle from "@/components/PageTitle.vue"
import PostCard from "@/components/Card.vue"
import CreatePost from "@/components/posts/CreatePost.vue"

const postList = ref<Post[]>([])

onMounted(async () => {
	await getPage()
})

const getPage = async (): Promise<void> => {
	try {
		postList.value = (await getPostsList()).data
	} catch (error) {
		console.log(error)
	}
}

const createPost = (post: Post): void => {
	postList.value.unshift(post)
}

const editPostTitle = async (id: number, title: string): Promise<void> => {
	try {
		const response = (await editPostTitleApi(id, title)).data

		postList.value = postList.value.map(item => {
			return item.id === id ? response : item
		})
	} catch (error) {
		console.log(error)
	}
}

const deletePost = async (id: number): Promise<void> => {
	try {
		await deletePostApi(id)

		// т.к. мок апи не удаляет пост из базы, удалим его на фронте
		postList.value = postList.value.filter(item => item.id !== id)
		// в реальном проекте скорее всего нужно было бы сделать запрос на получение списка
		// await getPage()
	} catch (error) {
		console.log(error)
	}
}
</script>

<template>
	<div>
		<PageTitle title="Posts List" />

		<CreatePost class="mb-8" @create="createPost" />

		<PostList>
			<PostCard
				v-for="item in postList"
				class="post-item"
				:id="item.id"
				:title="item.title"
				:body="item.body"
				@edit="editPostTitle"
				@delete="deletePost"
			/>
		</PostList>
	</div>
</template>

<style scoped>
.post-item {
	@apply relative;
}

.post-item::before {
	@apply content-[""] absolute top-6 -left-8 w-3 h-3 rounded-xl border-slate-200 border-2 bg-white translate-y-2 -translate-x-1/2;
}

.post-item:hover:before {
	@apply bg-slate-100 border-slate-300;
}
</style>
