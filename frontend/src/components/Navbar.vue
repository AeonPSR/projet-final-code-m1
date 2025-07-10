<template>
	<nav class="left-panel">
	  <!-- User Info Section -->
	  <div v-if="isLoggedIn" class="user-info">
		<div class="username">{{ user?.name }}</div>
		<div class="user-email">{{ user?.email }}</div>
	  </div>
  
	  <!-- Navigation Links -->
	  <router-link to="/">Home</router-link>
  
	  <template v-if="!isLoggedIn">
		<router-link to="/login">Login</router-link>
		<router-link to="/register">Register</router-link>
	  </template>
  
	  <template v-else>
		<router-link to="/dashboard">Dashboard</router-link>
		<button @click="handleLogout">Logout</button>
	  </template>
	</nav>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { useAuth } from '../composables/auth';
  
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  
  function handleLogout() {
	logout();
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
  
  .user-info {
	border-bottom: 1px solid #ccc;
	padding-bottom: 1rem;
	margin-bottom: 1rem;
  }
  
  .username {
	font-weight: bold;
	font-size: 1.1rem;
  }
  
  .user-email {
	font-size: 0.9rem;
	color: #666;
  }
  </style>
  