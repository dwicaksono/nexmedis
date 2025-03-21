<script setup lang="ts">
// No imports needed
</script>

<template>
	<div
		class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
		<router-view />
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
