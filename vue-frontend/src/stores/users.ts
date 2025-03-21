import { defineStore } from "pinia";
import { UserService } from "../services/UserService";

interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

interface UsersState {
	users: User[];
	currentPage: number;
	totalPages: number;
	loading: boolean;
	error: string | null;
}

export const useUsersStore = defineStore("users", {
	state: (): UsersState => ({
		users: [],
		currentPage: 1,
		totalPages: 1,
		loading: false,
		error: null,
	}),

	getters: {
		getUsers: (state) => state.users,
	},

	actions: {
		async fetchUsers(page: number = 1) {
			this.loading = true;
			this.error = null;

			try {
				const response = await UserService.fetchUsers(page);
				this.users = response.data;
				this.currentPage = response.page;
				this.totalPages = response.total_pages;
			} catch (error: any) {
				this.error = "Failed to fetch users";
				console.error(error);
			} finally {
				this.loading = false;
			}
		},

		async createUser(userData: {
			first_name: string;
			last_name: string;
			email: string;
		}) {
			this.loading = true;
			this.error = null;

			try {
				const newUser = await UserService.createUser(userData);
				// Since reqres.in doesn't actually create the user in their database,
				// we'll add the response to our local state
				this.users.push(newUser);
				return newUser;
			} catch (error: any) {
				this.error = "Failed to create user";
				console.error(error);
				throw error;
			} finally {
				this.loading = false;
			}
		},

		async updateUser(
			userId: number,
			userData: { first_name?: string; last_name?: string; email?: string }
		) {
			this.loading = true;
			this.error = null;

			try {
				const updatedUser = await UserService.updateUser(userId, userData);
				// Update user in local state
				const index = this.users.findIndex((user) => user.id === userId);
				if (index !== -1) {
					this.users[index] = { ...this.users[index], ...updatedUser };
				}
				return updatedUser;
			} catch (error: any) {
				this.error = "Failed to update user";
				console.error(error);
				throw error;
			} finally {
				this.loading = false;
			}
		},

		async deleteUser(userId: number) {
			this.loading = true;
			this.error = null;

			try {
				await UserService.deleteUser(userId);
				// Remove user from local state
				this.users = this.users.filter((user) => user.id !== userId);
				return true;
			} catch (error: any) {
				this.error = "Failed to delete user";
				console.error(error);
				throw error;
			} finally {
				this.loading = false;
			}
		},
	},
});
