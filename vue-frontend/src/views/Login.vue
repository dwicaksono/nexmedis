<script setup lang="ts">
import { LockClosedIcon, XCircleIcon } from "@heroicons/vue/24/solid";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import { useAuth } from "../composables/useAuth";
import { useTheme } from "../composables/useTheme";

// Use composables
const { email, password, rememberMe, loading, error, login } = useAuth();
const { isDark, toggle: toggleTheme, initialize: initTheme } = useTheme();

// Initialize theme
initTheme();
</script>

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
					Sign in to your account
				</h2>
				<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					Or
					<router-link
						to="/register"
						class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
						create a new account
					</router-link>
				</p>
			</div>
			<form class="mt-8 space-y-6" @submit.prevent="login">
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
							autocomplete="current-password"
							required
							v-model="password"
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
							placeholder="Password" />
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							v-model="rememberMe"
							class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700" />
						<label
							for="remember-me"
							class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
							Remember me
						</label>
					</div>

					<div class="text-sm">
						<button
							type="button"
							@click="toggleTheme"
							class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2">
							<SunIcon v-if="isDark === false" class="h-5 w-5" aria-hidden="true" />
							<MoonIcon v-else class="h-5 w-5" aria-hidden="true" />
							{{ isDark ? "Light Mode" : "Dark Mode" }}
						</button>
					</div>
				</div>

				<div>
					<button
						type="submit"
						:disabled="loading"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<LockClosedIcon
								class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
								aria-hidden="true" />
						</span>
						{{ loading ? "Signing in..." : "Sign in" }}
					</button>
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
					<p>Password: cityslicka</p>
				</div>
			</div>
		</div>
	</div>
</template>
