<template>
	<div>
	  <h1>Dashboard</h1>
	  <ul>
		<li v-for="project in projects" :key="project._id">
		  {{ project.title }}
		</li>
	  </ul>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { fetchProjects } from '../services/api';
  
  const projects = ref([]);
  
  onMounted(async () => {
	const token = localStorage.getItem('token');
	const res = await fetchProjects(token);
	projects.value = res;
  });
  </script>
  