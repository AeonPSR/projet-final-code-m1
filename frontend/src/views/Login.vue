<template>
	<form @submit.prevent="login">
	  <input v-model="email" type="email" placeholder="Email" required />
	  <input v-model="password" type="password" placeholder="Password" required />
	  <button type="submit">Login</button>
	</form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { loginUser } from '../services/api';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  async function login() {
	const res = await loginUser({ email: email.value, password: password.value });
  
	if (res.token) {
	  localStorage.setItem('token', res.token);
	  router.push('/dashboard');
	} else {
	  alert(res.error || 'Login failed. Try again.');
	}
  }
  </script>
  