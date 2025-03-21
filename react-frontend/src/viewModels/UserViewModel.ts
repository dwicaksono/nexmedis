import { useState, useCallback, useMemo, useEffect } from "react";
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  User,
  UserCreateData,
  UsersResponse
} from "@/services/user";

export interface UserViewModel {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  selectedUser: User | null;
  showAddModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  searchQuery: string;
  isSearching: boolean;
  userForm: {
    name: string;
    job: string;
  };
  fetchUsersList: (page?: number) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
  getUserById: (userId: number) => Promise<User | null>;
  handleCreateUser: () => Promise<User | null>;
  handleUpdateUser: (userId: number) => Promise<User | null>;
  handleDeleteUser: (userId: number) => Promise<boolean>;
  openAddUserModal: () => void;
  openEditUserModal: (user: User) => void;
  openDeleteModal: (user: User) => void;
  closeModals: () => void;
  setUserForm: (data: Partial<UserCreateData>) => void;
  setSearchQuery: (query: string) => void;
}

export function useUserViewModel(): UserViewModel {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [userForm, setUserFormState] = useState<UserCreateData>({
    name: "",
    job: ""
  });

  // Debounce search query
  useEffect(() => {
    if (searchQuery !== debouncedSearchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
        setIsSearching(false);
      }, 300); // 300ms delay

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchQuery, debouncedSearchQuery]);

  // Filter users based on debounced search query
  const filteredUsers = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return users;
    }
    
    const query = debouncedSearchQuery.toLowerCase().trim();
    return users.filter(user => 
      user.first_name.toLowerCase().includes(query) || 
      user.last_name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
  }, [users, debouncedSearchQuery]);

  const fetchUsersList = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response: UsersResponse = await fetchUsers(page);
      setUsers(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNextPage = useCallback(async () => {
    if (currentPage < totalPages) {
      await fetchUsersList(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchUsersList]);

  const fetchPreviousPage = useCallback(async () => {
    if (currentPage > 1) {
      await fetchUsersList(currentPage - 1);
    }
  }, [currentPage, fetchUsersList]);

  const getUserById = useCallback(async (userId: number): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await fetchUserById(userId);
      return user;
    } catch (err) {
      setError("Failed to fetch user details");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateUser = useCallback(async (): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await createUser(userForm);
      setShowAddModal(false);
      // Refresh the user list
      await fetchUsersList(currentPage);
      return newUser;
    } catch (err) {
      setError("Failed to create user");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userForm, currentPage, fetchUsersList]);

  const handleUpdateUser = useCallback(async (userId: number): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await updateUser(userId, userForm);
      setShowEditModal(false);
      // Refresh the user list
      await fetchUsersList(currentPage);
      return updatedUser;
    } catch (err) {
      setError("Failed to update user");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userForm, currentPage, fetchUsersList]);

  const handleDeleteUser = useCallback(async (userId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(userId);
      setShowDeleteModal(false);
      // Refresh the user list
      await fetchUsersList(currentPage);
      return true;
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentPage, fetchUsersList]);

  const openAddUserModal = useCallback(() => {
    setUserFormState({
      name: "",
      job: ""
    });
    setShowAddModal(true);
  }, []);

  const openEditUserModal = useCallback((user: User) => {
    setSelectedUser(user);
    setUserFormState({
      name: user.first_name + " " + user.last_name, 
      job: "" // Set a default empty value since User doesn't have a job property
    });
    setShowEditModal(true);
  }, []);

  const openDeleteModal = useCallback((user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  }, []);

  const closeModals = useCallback(() => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
  }, []);

  const setUserForm = useCallback((data: Partial<UserCreateData>) => {
    setUserFormState(prev => ({ ...prev, ...data }));
  }, []);

  const handleSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
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
    getUserById,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    openAddUserModal,
    openEditUserModal,
    openDeleteModal,
    closeModals,
    setUserForm,
    setSearchQuery: handleSearchQuery
  };
}
