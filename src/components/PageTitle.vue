<script setup lang="ts">
interface Props {
	title: string
}

defineProps<Props>()
</script>

<template>
	<h1 class="mb-8 text-3xl">{{ title }}</h1>
</template>

<style scoped></style>
