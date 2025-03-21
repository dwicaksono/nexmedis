import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export function useAuth() {
  const router = useRouter();
  const authStore = useAuthStore();
  
  const email = ref('');
  const password = ref('');
  const rememberMe = ref(false);
  const loading = ref(false);
  const error = ref('');
  
  const user = computed(() => authStore.getUser);
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  
  const login = async () => {
    loading.value = true;
    error.value = '';
    
    try {
      const success = await authStore.login(email.value, password.value);
      if (success) {
        router.push('/');
        return true;
      } else {
        error.value = authStore.error || 'Login failed';
        return false;
      }
    } catch (err) {
      error.value = 'An unexpected error occurred';
      console.error(err);
      return false;
    } finally {
      loading.value = false;
    }
  };
  
  const register = async () => {
    loading.value = true;
    error.value = '';
    
    try {
      const success = await authStore.register(email.value, password.value);
      if (success) {
        router.push('/');
        return true;
      } else {
        error.value = authStore.error || 'Registration failed';
        return false;
      }
    } catch (err) {
      error.value = 'An unexpected error occurred';
      console.error(err);
      return false;
    } finally {
      loading.value = false;
    }
  };
  
  const logout = () => {
    authStore.logout();
    router.push('/login');
  };
  
  return {
    email,
    password,
    rememberMe,
    loading,
    error,
    user,
    isAuthenticated,
    login,
    register,
    logout
  };
}
