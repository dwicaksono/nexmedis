import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/services/auth";
import {
	HomeIcon,
	UserIcon,
	SunIcon,
	MoonIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext/useAuth";
interface SidebarProps {
	isOpen: boolean;
	onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const [isDark, setIsDark] = useState(false);
	const { currentUser, fetchCurrentUser } = useAuth();
	// Initialize dark mode on component mount
	useEffect(() => {
		const savedMode = localStorage.getItem("darkMode");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		// Set initial state based on localStorage or system preference
		setIsDark(savedMode === "true" || (savedMode === null && prefersDark));
	}, []);

	// Get the current logged-in user from the context
	useEffect(() => {
		// Fetch the current user data if not already loaded
		if (!currentUser) {
			fetchCurrentUser(1);
		}
	}, [currentUser, fetchCurrentUser]);

	// Toggle dark mode
	const toggleTheme = () => {
		const newMode = !isDark;
		setIsDark(newMode);

		if (newMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		localStorage.setItem("darkMode", newMode.toString());
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	return (
		<div>
			{/* Mobile sidebar overlay */}
			{isOpen && (
				<div className="fixed inset-0 z-40 flex lg:hidden" onClick={onToggle}>
					<div
						className="fixed inset-0 bg-gray-600/30 backdrop-blur"
						aria-hidden="true"></div>
				</div>
			)}

			{/* Sidebar (mobile and desktop) */}
			<div
				className={`fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}>
				{/* Sidebar header with close button (mobile only) */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">
						NexMedis
					</h3>
					<button
						className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						onClick={onToggle}>
						<XMarkIcon className="h-6 w-6" />
					</button>
				</div>

				{/* User profile section */}
				{currentUser && (
					<div className="p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<img
									className="h-10 w-10 rounded-full"
									src={currentUser.avatar}
									alt={currentUser.name}
								/>
							</div>
							<div className="ml-3">
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{currentUser.name}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400 truncate">
									{currentUser.email}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Navigation links */}
				<nav className="flex-1 overflow-y-auto p-4">
					<ul className="space-y-2">
						<li>
							<Link
								to="/"
								className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
									isActive("/")
										? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
										: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
								}`}>
								<HomeIcon className="h-5 w-5 mr-3" />
								Dashboard
							</Link>
						</li>
						<li>
							<Link
								to="/profile"
								className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
									isActive("/profile")
										? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
										: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
								}`}>
								<UserIcon className="h-5 w-5 mr-3" />
								Profile
							</Link>
						</li>
					</ul>
				</nav>

				{/* Footer with theme toggle and logout */}
				<div className="p-4 border-t border-gray-200 dark:border-gray-700">
					<div className="flex flex-col gap-y-4  items-center justify-between">
						{/* Theme toggle */}
						<button
							onClick={toggleTheme}
							className="flex w-full items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
							{isDark ? (
								<SunIcon className="h-5 w-5 mr-2" />
							) : (
								<MoonIcon className="h-5 w-5 mr-2" />
							)}
							{isDark ? "Light Mode" : "Dark Mode"}
						</button>

						{/* Logout button */}
						<button
							onClick={handleLogout}
							className="text-red-600 w-full hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
