import { Link } from "react-router-dom";
import { useAuthViewModel } from "@/viewModels/LoginViewModel";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * Register page component
 * Follows MVVM pattern:
 * - Model: RegisterFormData interface in AuthViewModel
 * - ViewModel: useAuthViewModel hook that contains all business logic
 * - View: This component which is responsible only for rendering UI
 */
export default function Register() {
	// Use the view model to handle all business logic
	const {
		formData,
		error,
		loading,
		darkMode,
		handleChange,
		handleRegister,
		toggleDarkMode
	} = useAuthViewModel();

	// View layer - only responsible for rendering UI based on view model state
	return (
		<div className="w-full h-screen flex flex-col md:flex-row relative">
			{/* Theme toggle button */}
			<ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

			{/* Left side - Brand/Logo section */}
			<div className="w-full md:w-1/2 bg-primary dark:bg-primary/80 flex items-center justify-center p-8">
				<div className="text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						NexMedis
					</h1>
					<p className="text-white text-xl">
						Your complete healthcare management solution
					</p>
				</div>
			</div>

			{/* Right side - Register form */}
			<div className="w-full md:w-1/2 bg-background dark:bg-gray-800 flex items-center justify-center p-8">
				<div className="w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
						Create your account
					</h2>

					{error && (
						<div className="bg-destructive/20 text-destructive p-3 rounded-md mb-4">
							{error}
						</div>
					)}

					<form className="space-y-4" onSubmit={handleRegister}>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={formData.email}
								onChange={handleChange}
								className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="your@email.com"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={formData.password}
								onChange={handleChange}
								className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="••••••••"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4 dark:text-gray-900">
							{loading ? "Creating account..." : "Register"}
						</button>
					</form>

					<div className="text-center mt-6">
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							Already have an account?{" "}
							<Link
								to="/login"
								className="font-medium text-primary hover:text-primary/90">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
