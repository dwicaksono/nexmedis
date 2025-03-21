import { User } from "@/services/user";

interface UserModalProps {
	isOpen: boolean;
	onClose: () => void;
	isEdit?: boolean;
	user: User | null;
	formData: {
		name: string;
		job: string;
	};
	onChange: (field: string, value: string) => void;
	onSubmit: () => Promise<User | null> | Promise<boolean> | Promise<void>;
}

export default function UserModal({
	isOpen,
	onClose,
	isEdit = false,
	formData,
	onChange,
	onSubmit,
}: UserModalProps) {
	if (!isOpen) return null;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		onChange(name, value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSubmit();
	};

	return (
		<div className="fixed inset-0 bg-black/30 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
				<h2 className="text-xl font-semibold mb-4 dark:text-white">
					{isEdit ? "Edit User" : "Add New User"}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="first_name"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							First Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="job"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Job
						</label>
						<input
							type="text"
							id="job"
							name="job"
							value={formData.job}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
							required
						/>
					</div>
					<div className="flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							{isEdit ? "Save" : "Add"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
