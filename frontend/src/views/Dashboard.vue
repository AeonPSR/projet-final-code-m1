<template>
	<div>
	  <h1>Dashboard</h1>
  
	  <!-- Create new project -->
	  <form @submit.prevent="create">
		<input v-model="newTitle" placeholder="New project title" required />
		<input v-model="newDescription" placeholder="Description" />
		<button type="submit">Create</button>
	  </form>
  
	  <!-- Project List -->
	  <ul>
		<li v-for="project in projects" :key="project._id">
		  <div v-if="editingId !== project._id">
			<router-link :to="`/project/${project._id}`">{{ project.title }}</router-link>
			<button @click="startEdit(project)">Edit</button>
			<button @click="confirmDelete(project._id)">Delete</button>
		  </div>
  
		  <div v-else>
			<input v-model="editTitle" />
			<input v-model="editDescription" />
			<button @click="saveEdit(project._id)">Save</button>
			<button @click="cancelEdit">Cancel</button>
		  </div>
		</li>
	  </ul>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import {
	fetchProjects,
	createProject,
	updateProject,
	deleteProject
  } from '../services/api';
  
  const projects = ref([]);
  const token = localStorage.getItem('token');
  
  // New project form
  const newTitle = ref('');
  const newDescription = ref('');
  
  // Editing state
  const editingId = ref(null);
  const editTitle = ref('');
  const editDescription = ref('');
  
  // Load projects
  async function loadProjects() {
	const res = await fetchProjects(token);
	projects.value = res;
  }
  onMounted(loadProjects);
  
  // Create project
  async function create() {
	const res = await createProject({ title: newTitle.value, description: newDescription.value }, token);
	if (res._id) {
	  newTitle.value = '';
	  newDescription.value = '';
	  await loadProjects();
	} else {
	  alert(res.error || 'Creation failed');
	}
  }
  
  // Edit project
  function startEdit(project) {
	editingId.value = project._id;
	editTitle.value = project.title;
	editDescription.value = project.description;
  }
  function cancelEdit() {
	editingId.value = null;
  }
  
  // Save edits
  async function saveEdit(id) {
	const res = await updateProject(id, { title: editTitle.value, description: editDescription.value }, token);
	if (!res.error) {
	  editingId.value = null;
	  await loadProjects();
	} else {
	  alert(res.error || 'Update failed');
	}
  }
  
  // Delete with confirmation
  async function confirmDelete(id) {
	if (confirm("Are you sure you want to delete this project?")) {
	  const res = await deleteProject(id, token);
	  if (!res.error) {
		await loadProjects();
	  } else {
		alert(res.error || 'Deletion failed');
	  }
	}
  }
  </script>
  