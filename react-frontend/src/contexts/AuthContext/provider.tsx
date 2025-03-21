import { useState, useEffect, ReactNode } from "react";
import { fetchUserById } from "@/services/user";
import {  logout } from "@/services/auth";
import { AuthUser, AuthContextType } from "./types";
import { AuthContext } from "./context";

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
	const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Initialize auth state from localStorage on mount
	useEffect(() => {
		if (!currentUser) {
			fetchCurrentUser(1);
		}
	}, [currentUser]);

	// Fetch current user data from API
	const fetchCurrentUser = async (userId: number = 1) => {
		setLoading(true);
		setError(null);
		try {
			const user = await fetchUserById(userId);
			if (user) {
				const authUser: AuthUser = {
					id: user.id,
					name: `${user.first_name} ${user.last_name}`,
					email: user.email,
					avatar: user.avatar,
				};
				setCurrentUser(authUser);

				// Also update localStorage
				localStorage.setItem("user", JSON.stringify(authUser));
			}
		} catch (error) {
			console.error("Error fetching user:", error);
			setError("Failed to fetch user data");
		} finally {
			setLoading(false);
		}
	};

	// Handle logout
	const handleLogout = () => {
		logout();
		setCurrentUser(null);
	};

	// Context value
	const value: AuthContextType = {
		currentUser,
		loading,
		error,
		setCurrentUser,
		logout: handleLogout,
		fetchCurrentUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
