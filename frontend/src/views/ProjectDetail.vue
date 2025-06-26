<template>
	<div v-if="project">
	  <h2>{{ project.title }}</h2>
	  <p>{{ project.description }}</p>
  
	  <h3>Tasks</h3>
	  <ul>
		<li v-for="task in tasks" :key="task._id">
		  <strong>{{ task.title }}</strong> — {{ task.status }}
		</li>
	  </ul>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchProjectById } from '../services/api';
  
  const project = ref(null);
  const tasks = ref([]);
  const route = useRoute();
  
  onMounted(async () => {
	const token = localStorage.getItem('token');
	const res = await fetchProjectById(route.params.id, token);
	project.value = res.project;
	tasks.value = res.tasks;
  });
  </script>
  