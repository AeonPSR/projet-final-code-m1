<template>
	<form @submit.prevent="handleLogin">
	<input v-model="email" type="email" placeholder="Email" required />
	<input v-model="password" type="password" placeholder="Password" required />
	<button type="submit">Login</button>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../services/api';
import { useAuth } from '../composables/auth';

const { login } = useAuth();
const email = ref('');
const password = ref('');
const router = useRouter();

async function handleLogin() {
	const res = await loginUser({ email: email.value, password: password.value });

	if (res.token) {
		login(res.token, res.user);
		router.push('/dashboard');
	} else {
		alert(res.error || 'Login failed. Try again.');
	}
}
</script>
