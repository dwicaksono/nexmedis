<template>
	<div
		class="min-h-screen flex items-center justify-center bg-gray-500 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<h1
					class="text-center text-3xl font-extrabold text-blue-600 dark:text-blue-400">
					NEXMEDIS
				</h1>
				<h2
					class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
					Create a new account
				</h2>
				<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					Or
					<router-link
						to="/login"
						class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
						sign in to your existing account
					</router-link>
				</p>
			</div>
			<form class="mt-8 space-y-6" @submit.prevent="register">
				<div v-if="error" class="rounded-md bg-red-50 dark:bg-red-900 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-800 dark:text-red-200">
								{{ error }}
							</h3>
						</div>
					</div>
				</div>

				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="email-address" class="sr-only">Email address</label>
						<input
							id="email-address"
							name="email"
							type="email"
							autocomplete="email"
							required
							v-model="email"
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
							placeholder="Email address" />
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="new-password"
							required
							v-model="password"
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
							placeholder="Password" />
					</div>
					<div>
						<label for="confirm-password" class="sr-only"
							>Confirm Password</label
						>
						<input
							id="confirm-password"
							name="confirm-password"
							type="password"
							autocomplete="new-password"
							required
							v-model="confirmPassword"
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
							placeholder="Confirm Password" />
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="terms"
							name="terms"
							type="checkbox"
							required
							v-model="acceptTerms"
							class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700" />
						<label
							for="terms"
							class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
							I accept the terms and conditions
						</label>
					</div>

					<div class="text-sm">
						<button
							type="button"
							@click="toggleDarkMode"
							class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
							{{ isDarkMode ? "Light Mode" : "Dark Mode" }}
						</button>
					</div>
				</div>

				<div>
					<button
						type="submit"
						:disabled="loading || password !== confirmPassword"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<UserAddIcon
								class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
								aria-hidden="true" />
						</span>
						{{ loading ? "Creating account..." : "Create account" }}
					</button>
				</div>

				<div
					v-if="password !== confirmPassword"
					class="text-sm text-red-600 dark:text-red-400 text-center">
					Passwords do not match
				</div>
			</form>

			<div class="mt-6">
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<div
							class="w-full border-t border-gray-300 dark:border-gray-700"></div>
					</div>
					<div class="relative flex justify-center text-sm">
						<span
							class="px-2 bg-gray-500 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
							Test credentials
						</span>
					</div>
				</div>
				<div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
					<p>Email: eve.holt@reqres.in</p>
					<p>Password: pistol</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import {
	UserPlusIcon as UserAddIcon,
	XCircleIcon,
} from "@heroicons/vue/24/solid";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptTerms = ref(false);
const loading = ref(false);
const error = ref("");
const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

onMounted(() => {
	if (isDarkMode.value) {
		document.documentElement.classList.add("dark");
	}
});

const toggleDarkMode = () => {
	isDarkMode.value = !isDarkMode.value;
	localStorage.setItem("darkMode", isDarkMode.value.toString());

	if (isDarkMode.value) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
};

const register = async () => {
	if (password.value !== confirmPassword.value) {
		return;
	}

	loading.value = true;
	error.value = "";

	try {
		const success = await authStore.register(email.value, password.value);

		if (success) {
			router.push("/");
		} else {
			error.value = authStore.error || "Registration failed";
		}
	} catch (err) {
		error.value = "An unexpected error occurred";
		console.error(err);
	} finally {
		loading.value = false;
	}
};
</script>
