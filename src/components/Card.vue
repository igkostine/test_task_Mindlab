<script setup lang="ts">
import EditIcon from "@/assets/icons/EditIcon.vue"
import DeleteIcon from "@/assets/icons/DeleteIcon.vue"
import { ref, nextTick } from "vue"

interface Props {
	id: number
	title: string
	body?: string
}

const props = defineProps<Props>()
const emits = defineEmits<{
	edit: [id: number, title: string]
	delete: [id: number]
}>()

const input = ref<HTMLInputElement>()

const edit = ref<boolean>(false)

const editActive = () => {
	edit.value = true

	nextTick(() => {
		input.value?.focus()
	})
}

const editConfirm = (e: FocusEvent) => {
	edit.value = false

	emits("edit", props.id, (e.target as HTMLInputElement).value)
}
</script>

<template>
	<div
		class="card relative p-6 flex flex-col justify-between gap-4 rounded-3xl bg-slate-50 hover:bg-slate-100"
	>
		<div>
			<input
				v-if="edit"
				class="font-semibold text-base text-slate-900 w-1/2"
				ref="input"
				:value="title"
				@blur="editConfirm"
			/>
			<h3 v-else class="font-semibold text-base text-slate-900">{{ title }}</h3>

			<p class="text-slate-500 text-ellipsis line-clamp-2">{{ body }}</p>
		</div>

		<div
			class="btn-delete absolute right-0 top-0 w-0 h-full flex items-center justify-center bg-red-200 translate-x-full duration-300 rounded-br-3xl rounded-tr-3xl cursor-pointer"
			@click="$emit('delete', id)"
		>
			<DeleteIcon class="fill-slate-950 relative w-8 h-8" />
		</div>

		<div
			class="btn-edit absolute right-0 top-0 w-0 h-full flex items-center justify-center bg-green-200 translate-x-full duration-300 cursor-pointer"
			@click="editActive"
		>
			<EditIcon class="fill-slate-600 relative w-8 h-8" />
		</div>
	</div>
</template>

<style scoped>
.card:hover .btn-delete {
	@apply w-20 translate-x-0;
}

.card:hover .btn-edit {
	@apply w-20 -translate-x-full;
}
</style>
