<script setup lang="ts">
import { onMounted, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import { useUserManagement } from "../composables/useUserManagement";
import { useAuth } from "../composables/useAuth";
import { Bars3Icon as MenuIcon } from "@heroicons/vue/24/outline";

// Use composables
const { user, isAuthenticated } = useAuth();
const {
	users,
	loading,
	currentPage,
	totalPages,
	fetchUsers,
	openAddUserModal,
	openEditUserModal,
	openDeleteModal,
	showAddUserModal,
	showEditUserModal,
	showDeleteModal,
	userForm,
	createUser,
	updateUser,
	deleteUser,
	fetchNextPage,
	fetchPreviousPage,
	closeModals,
} = useUserManagement();
const isSidebarOpen = ref(false);

// Fetch users on component mount
onMounted(() => {
	fetchUsers();
});

// Toggle sidebar
const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
	<div class="flex h-screen bg-gray-100 dark:bg-gray-900">
		<Sidebar :is-open="isSidebarOpen" @toggle="toggleSidebar" />

		<div class="flex-1 overflow-auto">
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
							User Management
						</h1>
					</div>
				</div>
			</div>

			<div class="p-6">
				<!-- User Profile Summary -->
        
				<div class="flex justify-between items-center mb-6">
          <div
            v-if="isAuthenticated && user"
            class="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  v-if="user.avatar"
                  :src="user.avatar"
                  alt="User Avatar"
                  class="h-12 w-12 rounded-full" />
                <div
                  v-else
                  class="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span class="text-gray-600 dark:text-gray-300 text-lg">{{
                    user.first_name?.[0] || "U"
                  }}</span>
                </div>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                  Welcome, {{ user.first_name || "User" }}!
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ user.email }}
                </p>
              </div>
            </div>
          </div>
					<button
						@click="openAddUserModal"
						class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
						Add User
					</button>
				</div>

				<div
					v-if="loading && users.length === 0"
					class="flex justify-center items-center h-64">
					<div
						class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
				</div>

				<div v-else-if="users.length === 0" class="text-center py-12">
					<p class="text-gray-500 dark:text-gray-400">No users found.</p>
				</div>

				<div
					v-else
					class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
					<table
						class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead class="bg-gray-50 dark:bg-gray-700">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
									ID
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
									Name
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
									Email
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody
							class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
							<tr v-for="user in users" :key="user.id">
								<td
									class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{{ user.id }}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="flex-shrink-0 h-10 w-10">
											<img
												class="h-10 w-10 rounded-full"
												:src="user.avatar"
												alt="" />
										</div>
										<div class="ml-4">
											<div
												class="text-sm font-medium text-gray-900 dark:text-white">
												{{ user.first_name }} {{ user.last_name }}
											</div>
										</div>
									</div>
								</td>
								<td
									class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{{ user.email }}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button
										@click="openEditUserModal(user)"
										class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
										Edit
									</button>
									<button
										@click="openDeleteModal(user.id)"
										class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
										Delete
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Pagination -->
				<div class="flex justify-between items-center mt-4">
					<div class="text-sm text-gray-700 dark:text-gray-300">
						Page {{ currentPage }} of {{ totalPages }}
					</div>
					<div class="flex space-x-2">
						<button
							@click="fetchPreviousPage"
							:disabled="currentPage <= 1 || loading"
							class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50">
							Previous
						</button>
						<button
							@click="fetchNextPage"
							:disabled="currentPage >= totalPages || loading"
							class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50">
							Next
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Add User Modal -->
		<div v-if="showAddUserModal" class="fixed inset-0 z-10 overflow-y-auto">
			<div
				class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<div
					class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div class="sm:flex sm:items-start">
							<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
								<h3
									class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
									Add New User
								</h3>
								<div class="mt-2">
									<form @submit.prevent="createUser">
										<div class="mb-4">
											<label
												for="first_name"
												class="block text-sm font-medium text-gray-700 dark:text-gray-300">
												First Name
											</label>
											<input
												type="text"
												id="first_name"
												v-model="userForm.first_name"
												required
												class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
										</div>
										<div class="mb-4">
											<label
												for="last_name"
												class="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Last Name
											</label>
											<input
												type="text"
												id="last_name"
												v-model="userForm.last_name"
												required
												class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
										</div>
										<div class="mb-4">
											<label
												for="email"
												class="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Email
											</label>
											<input
												type="email"
												id="email"
												v-model="userForm.email"
												required
												class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
										</div>
										<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
											<button
												type="submit"
												:disabled="loading"
												class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
												{{ loading ? "Saving..." : "Save" }}
											</button>
											<button
												type="button"
												@click="closeModals"
												class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
												Cancel
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Edit User Modal -->
		<div v-if="showEditUserModal" class="fixed inset-0 z-10 overflow-y-auto">
			<div
				class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<div
					class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div class="sm:flex sm:items-start">
							<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
								<h3
									class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
									Edit User
								</h3>
								<div class="mt-2">
									<form @submit.prevent="updateUser">
										<div class="mb-4">
											<label
												for="edit_first_name"
												class="block text-sm font-medium text-gray-700 dark:text-gray-300">
												First Name
											</label>
											<input
												type="text"
												id="edit_first_name"
												v-model="userForm.first_name"
												required
												class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
										</div>
										<div class="mb-4">
											<label
												for="edit_last_name"
												class="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Last Name
											</label>
											<input
												type="text"
												id="edit_last_name"
												v-model="userForm.last_name"
												required
												class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
										</div>
										<div class="mb-4">
											<label
												for="edit_email"
												class="block text-sm font-medium text-gray-700 dark:text-gray-300">
												Email
											</label>
											<input
												type="email"
												id="edit_email"
												v-model="userForm.email"
												required
												class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
										</div>
										<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
											<button
												type="submit"
												:disabled="loading"
												class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
												{{ loading ? "Updating..." : "Update" }}
											</button>
											<button
												type="button"
												@click="closeModals"
												class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
												Cancel
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Delete Confirmation Modal -->
		<div v-if="showDeleteModal" class="fixed inset-0 z-10 overflow-y-auto">
			<div
				class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="fixed inset-0 transition-opacity" aria-hidden="true">
					<div class="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<div
					class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div class="sm:flex sm:items-start">
							<div
								class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
								<svg
									class="h-6 w-6 text-red-600 dark:text-red-400"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
								</svg>
							</div>
							<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3
									class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
									Delete User
								</h3>
								<div class="mt-2">
									<p class="text-sm text-gray-500 dark:text-gray-400">
										Are you sure you want to delete this user? This action
										cannot be undone.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div
						class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							@click="deleteUser"
							:disabled="loading"
							class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
							{{ loading ? "Deleting..." : "Delete" }}
						</button>
						<button
							type="button"
							@click="closeModals"
							class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
