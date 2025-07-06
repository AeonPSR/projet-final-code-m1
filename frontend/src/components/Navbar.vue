<template>
	<nav class="left-panel">
	  <router-link to="/">Home</router-link>
	  <template v-if="!isLoggedIn">
		<router-link to="/login">Login</router-link>
		<router-link to="/register">Register</router-link>
	  </template>
	  <template v-else>
		<router-link to="/dashboard">Dashboard</router-link>
		<button @click="logout">Logout</button>
	  </template>
	</nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = computed(() => !!localStorage.getItem('token'));

function logout() {
	localStorage.removeItem('token');
	router.push('/login');
}
</script>

<style scoped>
.left-panel {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.left-panel a,
.left-panel button {
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
}

.left-panel button:hover,
.left-panel a:hover {
  color: #007bff;
}
</style>
