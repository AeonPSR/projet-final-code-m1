<template>
	<form @submit.prevent="register">
	  <input v-model="name" type="text" placeholder="Name" required />
	  <input v-model="email" type="email" placeholder="Email" required />
	  <input v-model="password" type="password" placeholder="Password" required />
	  <button type="submit">Register</button>
	</form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { registerUser } from '../services/api';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  async function register() {
	const res = await registerUser({
	  name: name.value,
	  email: email.value,
	  password: password.value,
	});
  
	if (res.message === 'User registered') {
	  router.push('/login');
	} else {
	  alert(res.error || 'Registration failed. Try again.');
	}
  }
  </script>
  