<script setup lang="ts">
import Header from "@/components/Header.vue"
</script>

<template>
	<div>
		<Header />

		<div class="p-4 px-16">
			<RouterView />
		</div>
	</div>
</template>

<style scoped></style>
