<template>
	<div class="flex min-h-screen bg-gray-500 dark:bg-gray-900">
		<Sidebar :is-open="isSidebarOpen" @toggle="toggleSidebar" />

		<div class="flex flex-col flex-1">
			<div
				class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
				<button
					type="button"
					class="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
					@click="toggleSidebar">
					<span class="sr-only">Open sidebar</span>
					<MenuIcon class="h-6 w-6" aria-hidden="true" />
				</button>

				<div class="flex-1 px-4 flex justify-between">
					<div class="flex-1 flex">
						<h1
							class="text-2xl font-semibold text-gray-900 dark:text-white self-center">
							Profile
						</h1>
					</div>
				</div>
			</div>

			<main class="flex-1 p-6">
				<div
					class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
					<div class="px-4 py-5 sm:px-6 flex justify-between">
						<div>
							<h3
								class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
								User Profile
							</h3>
							<p
								class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
								Personal details and information
							</p>
						</div>
						<button @click="isEditing = !isEditing" class="btn btn-primary">
							{{ isEditing ? "Cancel" : "Edit Profile" }}
						</button>
					</div>

					<div class="border-t border-gray-200 dark:border-gray-700">
						<div v-if="loading" class="p-6 text-center">
							<p class="text-gray-500 dark:text-gray-400">Loading profile...</p>
						</div>

						<div v-else class="p-6">
							<div class="flex items-center mb-6">
								<div class="flex-shrink-0 h-24 w-24">
									<img
										v-if="user?.avatar"
										class="h-24 w-24 rounded-full"
										:src="user.avatar"
										alt="" />
									<UserCircleIcon
										v-else
										class="h-24 w-24 text-gray-400"
										aria-hidden="true" />
								</div>
								<div class="ml-6">
									<h2 class="text-xl font-bold text-gray-900 dark:text-white">
										{{ user?.first_name }} {{ user?.last_name }}
									</h2>
									<p class="text-sm text-gray-500 dark:text-gray-400">
										{{ user?.email }}
									</p>
								</div>
							</div>

							<form v-if="isEditing" @submit.prevent="updateProfile">
								<div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
									<div>
										<label
											for="first_name"
											class="block text-sm font-medium text-gray-700 dark:text-gray-300">
											First name
										</label>
										<input
											type="text"
											id="first_name"
											v-model="profileForm.first_name"
											class="input mt-1"
											required />
									</div>

									<div>
										<label
											for="last_name"
											class="block text-sm font-medium text-gray-700 dark:text-gray-300">
											Last name
										</label>
										<input
											type="text"
											id="last_name"
											v-model="profileForm.last_name"
											class="input mt-1"
											required />
									</div>

									<div class="sm:col-span-2">
										<label
											for="email"
											class="block text-sm font-medium text-gray-700 dark:text-gray-300">
											Email
										</label>
										<input
											type="email"
											id="email"
											v-model="profileForm.email"
											class="input mt-1"
											required />
									</div>
								</div>

								<div class="mt-6 flex justify-end">
									<button
										type="button"
										class="btn btn-secondary mr-3"
										@click="isEditing = false">
										Cancel
									</button>
									<button
										type="submit"
										class="btn btn-primary"
										:disabled="updateLoading">
										{{ updateLoading ? "Saving..." : "Save" }}
									</button>
								</div>
							</form>

							<div v-else>
								<dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
									<div class="sm:col-span-1">
										<dt
											class="text-sm font-medium text-gray-500 dark:text-gray-400">
											First name
										</dt>
										<dd class="mt-1 text-sm text-gray-900 dark:text-white">
											{{ user?.first_name }}
										</dd>
									</div>

									<div class="sm:col-span-1">
										<dt
											class="text-sm font-medium text-gray-500 dark:text-gray-400">
											Last name
										</dt>
										<dd class="mt-1 text-sm text-gray-900 dark:text-white">
											{{ user?.last_name }}
										</dd>
									</div>

									<div class="sm:col-span-2">
										<dt
											class="text-sm font-medium text-gray-500 dark:text-gray-400">
											Email
										</dt>
										<dd class="mt-1 text-sm text-gray-900 dark:text-white">
											{{ user?.email }}
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useUsersStore } from "../stores/users";
import {
	Bars3Icon as MenuIcon,
	UserCircleIcon,
	
} from "@heroicons/vue/24/outline";
import Sidebar from "../components/Sidebar.vue";

const authStore = useAuthStore();
const usersStore = useUsersStore();

// User data
const user = computed(() => authStore.getUser);
const loading = computed(() => authStore.loading);

// UI state
const isSidebarOpen = ref(false);
const isDarkMode = ref(localStorage.getItem("darkMode") === "true");
const isEditing = ref(false);
const updateLoading = ref(false);

// Form state
const profileForm = ref({
	first_name: "",
	last_name: "",
	email: "",
});

// Initialize form with user data
onMounted(() => {
	if (isDarkMode.value) {
		document.documentElement.classList.add("dark");
	}

	// Fetch user data if not already loaded
	if (!user.value) {
		authStore.fetchUserData();
	} else {
		updateFormWithUserData();
	}
});

// Watch for user data changes
watch(user, () => {
	if (user.value) {
		updateFormWithUserData();
	}
});

function updateFormWithUserData() {
	if (user.value) {
		profileForm.value = {
			first_name: user.value.first_name,
			last_name: user.value.last_name,
			email: user.value.email,
		};
	}
}

// Toggle sidebar
const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};



// Update profile
const updateProfile = async () => {
	if (!user.value) return;

	updateLoading.value = true;

	try {
		await usersStore.updateUser(user.value.id, {
			first_name: profileForm.value.first_name,
			last_name: profileForm.value.last_name,
			email: profileForm.value.email,
		});

		// Update local user data
		await authStore.fetchUserData();

		isEditing.value = false;
	} catch (error) {
		console.error("Failed to update profile:", error);
	} finally {
		updateLoading.value = false;
	}
};
</script>
