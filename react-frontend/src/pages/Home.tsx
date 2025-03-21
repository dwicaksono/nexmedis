import { useState, useEffect } from "react";
import { useUserViewModel } from "@/viewModels/UserViewModel";
import Sidebar from "@/components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import UserModal from "@/components/UserModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { User } from "@/services/user";
import { useAuth } from "@/contexts/AuthContext/useAuth";

export default function Home() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	// Use the user view model for managing users
	const {
		users,
		filteredUsers,
		loading,
		error,
		currentPage,
		totalPages,
		selectedUser,
		showAddModal,
		showEditModal,
		showDeleteModal,
		searchQuery,
		isSearching,
		userForm,
		fetchUsersList,
		fetchNextPage,
		fetchPreviousPage,
		handleCreateUser,
		handleUpdateUser,
		handleDeleteUser,
		openAddUserModal,
		openEditUserModal,
		openDeleteModal,
		closeModals,
		setUserForm,
		setSearchQuery,
	} = useUserViewModel();
	const { currentUser } = useAuth();

	// Fetch users on component mount
	useEffect(() => {
		fetchUsersList();
	}, [fetchUsersList]);

	// Toggle sidebar
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex h-screen bg-gray-100 dark:bg-gray-900">
			{/* Sidebar */}
			<Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

			{/* Main content */}
			<div className="flex-1 overflow-auto">
				{/* Header */}
				<div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
					<button
						type="button"
						className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
						onClick={toggleSidebar}>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>

					<div className="flex-1 px-4 flex justify-between">
						<div className="flex-1 flex">
							<h4 className="text-2xl font-semibold text-gray-900 dark:text-white self-center">
								User Management
							</h4>
						</div>
					</div>
				</div>

				<div className="p-6">
					{/* User Profile Summary */}
					{currentUser && (
						<div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
								Welcome, {currentUser.name}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<p className="text-gray-600 dark:text-gray-300">
										<span className="font-medium">Email:</span>{" "}
										{currentUser.email}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* User Management Section */}
					<div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
								Users
							</h2>
							<button
								onClick={openAddUserModal}
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
								Add User
							</button>
						</div>

						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
								{error}
							</div>
						)}

						{/* Search Bar */}
						<div className="mb-4">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
									</svg>
								</div>
								<input
									type="search"
									id="user-search"
									className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
									placeholder="Search by name or email..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								{isSearching && (
									<div className="absolute inset-y-0 right-0 flex items-center pr-3">
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
									</div>
								)}
								{searchQuery && !isSearching && (
									<button 
										className="absolute inset-y-0 right-0 flex items-center pr-3 text-white hover:text-gray-200 dark:text-white dark:hover:text-gray-200"
										onClick={() => setSearchQuery("")}
										aria-label="Clear search">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</button>
								)}
							</div>
						</div>

						{/* Users Table */}
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-gray-50 dark:bg-gray-700">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
											ID
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
											Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
											Email
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
									{loading && users.length === 0 ? (
										<tr>
											<td
												colSpan={4}
												className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
												Loading users...
											</td>
										</tr>
									) : filteredUsers.length === 0 ? (
										<tr>
											<td
												colSpan={4}
												className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
												{searchQuery 
													? `No users found matching "${searchQuery}"`
													: "No users found"}
											</td>
										</tr>
									) : (
										filteredUsers.map((user: User) => (
											<tr key={user.id}>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
													{user.id}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div className="flex-shrink-0 h-10 w-10">
															<img
																className="h-10 w-10 rounded-full"
																src={user.avatar}
																alt={`${user.first_name} ${user.last_name}`}
															/>
														</div>
														<div className="ml-4">
															<div className="text-sm font-medium text-gray-900 dark:text-white">
																{user.first_name} {user.last_name}
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
													{user.email}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
													<button
														onClick={() => openEditUserModal(user)}
														className="text-white hover:text-blue-100 dark:text-white dark:hover:text-blue-100 mr-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 px-2 py-1 rounded">
														Edit
													</button>
													<button
														onClick={() => openDeleteModal(user)}
														className="text-white hover:text-red-100 dark:text-white dark:hover:text-red-100 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 px-2 py-1 rounded">
														Delete
													</button>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>

						{/* Pagination */}
						<div className="flex justify-between items-center mt-4">
							<div className="text-sm text-gray-700 dark:text-gray-300">
								{searchQuery ? 
									`Showing ${filteredUsers.length} ${filteredUsers.length === 1 ? 'result' : 'results'}` : 
									`Page ${currentPage} of ${totalPages}`
								}
							</div>
							{!searchQuery && (
								<div className="flex space-x-2">
									<button
										onClick={fetchPreviousPage}
										disabled={currentPage === 1 || loading}
										className={`px-3 py-1 rounded ${
											currentPage === 1 || loading
												? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
												: "bg-blue-600 text-white hover:bg-blue-700"
										}`}>
										Previous
									</button>
									<button
										onClick={fetchNextPage}
										disabled={currentPage === totalPages || loading}
										className={`px-3 py-1 rounded ${
											currentPage === totalPages || loading
												? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
												: "bg-blue-600 text-white hover:bg-blue-700"
										}`}>
										Next
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Add/Edit User Modal */}
			{(showAddModal || showEditModal) && (
				<UserModal
					isOpen={showAddModal || showEditModal}
					isEdit={showEditModal}
					user={selectedUser}
					formData={userForm}
					onClose={closeModals}
					onChange={(field, value) => setUserForm({ [field]: value })}
					onSubmit={
						showEditModal && selectedUser
							? () => handleUpdateUser(selectedUser.id)
							: handleCreateUser
					}
				/>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteModal && selectedUser && (
				<DeleteConfirmationModal
					isOpen={showDeleteModal}
					user={selectedUser}
					onClose={closeModals}
					onConfirm={() => handleDeleteUser(selectedUser.id)}
				/>
			)}
		</div>
	);
}
