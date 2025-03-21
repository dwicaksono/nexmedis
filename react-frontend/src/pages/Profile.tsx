import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import http from "@/services/http";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Profile() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { currentUser, setCurrentUser } = useAuth();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState({ type: "", text: "" });

	useEffect(() => {
		if (currentUser) {
			setFormData((prev) => ({
				...prev,
				name: currentUser.name || "",
				email: currentUser.email || "",
			}));
		}
	}, [currentUser]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleProfileUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage({ type: "", text: "" });

		try {
			await http.put(`/users/${currentUser?.id}`, {
				name: formData.name,
				email: formData.email,
			});

			// Update local storage with new user data
			if (currentUser) {
				const updatedUser = {
					...currentUser,
					name: formData.name,
					email: formData.email,
				};
				localStorage.setItem("user", JSON.stringify(updatedUser));
				setCurrentUser(updatedUser);
			}

			setMessage({ type: "success", text: "Profile updated successfully!" });
		} catch (err: unknown) {
			let errorMessage = "Failed to update profile";
			
			if (err instanceof Error) {
				errorMessage = err.message;
			} else if (
				typeof err === 'object' && 
				err !== null && 
				'response' in err && 
				typeof err.response === 'object' && 
				err.response !== null &&
				'data' in err.response &&
				typeof err.response.data === 'object' &&
				err.response.data !== null &&
				'message' in err.response.data &&
				typeof err.response.data.message === 'string'
			) {
				errorMessage = err.response.data.message;
			}
			
			setMessage({
				type: "error",
				text: errorMessage,
			});
		} finally {
			setLoading(false);
		}
	};

	// Toggle sidebar
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex h-screen bg-gray-100 dark:bg-gray-900">
			<Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
			<main className="flex-1 overflow-auto">
				<div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
					<button
						type="button"
						className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-white lg:hidden"
						onClick={toggleSidebar}>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>

					<div className="flex-1 px-4 flex justify-between">
						<div className="flex-1 flex">
							<h4 className="text-2xl font-semibold text-gray-900 dark:text-white self-center">
								Profile
							</h4>
						</div>
					</div>
				</div>
				<div className="max-w-3xl mx-auto  p-8">
					{message.text && (
						<div
							className={`p-4 mb-6 rounded-md ${
								message.type === "success"
									? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
									: "bg-destructive/20 text-destructive"
							}`}>
							{message.text}
						</div>
					)}

					<div className="space-y-8 ">
						<div className="p-6 rounded-lg border border-border bg-white dark:bg-gray-800 shadow   ">
							<h2 className="text-xl font-semibold text-card-foreground mb-4">
								Personal Information
							</h2>
							<form onSubmit={handleProfileUpdate} className="space-y-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-card-foreground mb-1">
										Full Name
									</label>
									<input
										id="name"
										name="name"
										type="text"
										value={formData.name}
										onChange={handleChange}
										className="w-full px-3 py-2  border border-input bg-white dark:bg-gray-900 shadow rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
										required
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-card-foreground mb-1">
										Email
									</label>
									<input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary 
                    bg-white dark:bg-gray-900 shadow
                    "
										required
									/>
								</div>

								<div>
									<button
										type="submit"
										disabled={loading}
										className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:text-white">
										{loading ? "Updating..." : "Update Profile"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
