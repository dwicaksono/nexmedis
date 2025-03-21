<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useTheme } from "../composables/useTheme";
import { HomeIcon, UserIcon, UserCircleIcon, SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

defineProps({
	isOpen: {
		type: Boolean,
		required: true,
	},
});

defineEmits(["toggle"]);

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.getUser);

// Use theme composable
const { isDark, toggle: toggleTheme, initialize } = useTheme();

// Initialize dark mode on component mount
onMounted(() => {
	initialize();
});

const logout = () => {
	authStore.logout();
	router.push("/login");
};
</script>


<template>
	<div>
		<!-- Mobile sidebar overlay -->
		<div
			v-if="isOpen"
			class="fixed inset-0 z-40 flex lg:hidden"
			@click="$emit('toggle')">
			<div
				class="fixed inset-0 bg-gray-600/30 backdrop-blur"
				aria-hidden="true"></div>
		</div>

		<!-- Sidebar (mobile and desktop) -->
		<div
			class="fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen"
			:class="isOpen ? 'translate-x-0' : '-translate-x-full'">
			<div class="flex-1 flex flex-col pt-5 pb-4">
				<div class="flex items-center flex-shrink-0 px-4">
					<h1 class="text-xl font-bold text-blue-600 dark:text-blue-400">
						NEXMEDIS
					</h1>
				</div>
				<nav class="mt-5 flex-1 px-2 space-y-1">
					<router-link
						to="/"
						class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
						:class="[
							$route.path === '/'
								? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
								: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
						]">
						<HomeIcon
							class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
						Dashboard
					</router-link>

					<router-link
						to="/profile"
						class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
						:class="[
							$route.path === '/profile'
								? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
								: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
						]">
						<UserIcon
							class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
						Profile
					</router-link>

					<!-- Dark Mode Toggle -->
					<button
						@click="toggleTheme"
						class="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
						<template v-if="isDark">
							<SunIcon class="mr-3 h-6 w-6 text-yellow-500" />
							Light Mode
						</template>
						<template v-else>
							<MoonIcon class="mr-3 h-6 w-6 text-gray-400" />
							Dark Mode
						</template>
					</button>
				</nav>
			</div>
			<div
				class="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
				<div class="flex items-center">
					<div>
						<img
							v-if="user?.avatar"
							class="inline-block h-9 w-9 rounded-full"
							:src="user.avatar"
							alt="" />
						<UserCircleIcon v-else class="inline-block h-9 w-9 text-gray-400" />
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-gray-700 dark:text-gray-200">
							{{ user?.first_name || "User" }} {{ user?.last_name || "" }}
						</p>
						<button
							@click="logout"
							class="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

