import { ref, computed } from 'vue';
import { useUsersStore } from '../stores/users';

export function useUserManagement() {
  const usersStore = useUsersStore();
  
  // Form state
  const userForm = ref({
    id: null as number | null,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  });
  
  // Modal state
  const showAddUserModal = ref(false);
  const showEditUserModal = ref(false);
  const showDeleteModal = ref(false);
  const userToDelete = ref<number | null>(null);
  
  // Computed properties
  const users = computed(() => usersStore.getUsers);
  const loading = computed(() => usersStore.loading);
  const currentPage = computed(() => usersStore.currentPage);
  const totalPages = computed(() => usersStore.totalPages);
  const error = computed(() => usersStore.error);
  
  // Methods
  const fetchUsers = (page: number = 1) => {
    return usersStore.fetchUsers(page);
  };
  
  const resetForm = () => {
    userForm.value = {
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    };
  };
  
  const openAddUserModal = () => {
    resetForm();
    showAddUserModal.value = true;
  };
  
  const openEditUserModal = (user: any) => {
    userForm.value = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar: user.avatar || '',
    };
    showEditUserModal.value = true;
  };
  
  const openDeleteModal = (userId: number) => {
    userToDelete.value = userId;
    showDeleteModal.value = true;
  };
  
  const closeModals = () => {
    showAddUserModal.value = false;
    showEditUserModal.value = false;
    showDeleteModal.value = false;
    resetForm();
  };
  
  const createUser = async () => {
    try {
      await usersStore.createUser({
        first_name: userForm.value.first_name,
        last_name: userForm.value.last_name,
        email: userForm.value.email,
      });
      closeModals();
      return true;
    } catch (error) {
      console.error('Failed to add user:', error);
      return false;
    }
  };
  
  const updateUser = async () => {
    if (!userForm.value.id) return false;
    
    try {
      await usersStore.updateUser(userForm.value.id, {
        first_name: userForm.value.first_name,
        last_name: userForm.value.last_name,
        email: userForm.value.email,
      });
      closeModals();
      return true;
    } catch (error) {
      console.error('Failed to update user:', error);
      return false;
    }
  };
  
  const deleteUser = async () => {
    if (!userToDelete.value) return false;
    
    try {
      await usersStore.deleteUser(userToDelete.value);
      closeModals();
      return true;
    } catch (error) {
      console.error('Failed to delete user:', error);
      return false;
    }
  };
  
  // Pagination
  const fetchNextPage = () => {
    if (currentPage.value < totalPages.value) {
      return fetchUsers(currentPage.value + 1);
    }
  };
  
  const fetchPreviousPage = () => {
    if (currentPage.value > 1) {
      return fetchUsers(currentPage.value - 1);
    }
  };
  
  return {
    userForm,
    showAddUserModal,
    showEditUserModal,
    showDeleteModal,
    userToDelete,
    users,
    loading,
    currentPage,
    totalPages,
    error,
    fetchUsers,
    resetForm,
    openAddUserModal,
    openEditUserModal,
    openDeleteModal,
    closeModals,
    createUser,
    updateUser,
    deleteUser,
    fetchNextPage,
    fetchPreviousPage
  };
}
