<script setup lang="ts">
import { ref } from "vue"
import { createPost as createPostApi } from "@/api/posts"
import { Post } from "@/types/posts"

const emits = defineEmits<{
	create: [post: Post]
}>()
const title = ref<string>("")

const createPost = async (): Promise<void> => {
	try {
		const response = (await createPostApi(title.value)).data

		emits("create", response)
	} catch (error) {
		console.log(error)
	}
}
</script>

<template>
	<div class="flex flex-row gap-4">
		<input
			class="p-2 border-slate-400 border-[1px] rounded-xl w-1/2"
			type="text"
			v-model="title"
			placeholder="Введите заголовок"
		/>

		<button
			class="bg-slate-200 p-2 rounded-xl hover:bg-slate-300"
			@click="createPost"
		>
			Создать
		</button>
	</div>
</template>

<style scoped></style>
