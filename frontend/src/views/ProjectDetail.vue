<template>
	<div v-if="project">
		<h2>{{ project.title }}</h2>
		<p>{{ project.description }}</p>

		<!-- ADD TASK -->
		<h3>Add New Task</h3>
		<form @submit.prevent="submitTask">
			<input v-model="newTask.title" placeholder="Title" required />
			<input v-model="newTask.description" placeholder="Description" required />
			<select v-model="newTask.status">
			<option value="todo">To Do</option>
			<option value="in progress">In Progress</option>
			<option value="done">Done</option>
			</select>
			<button type="submit">Add</button>
		</form>

		<!-- TASK LIST -->
		<h3>Tasks</h3>
		<ul>
			<li v-for="task in tasks" :key="task._id">
			<div v-if="editingTaskId === task._id">
				<input v-model="editTask.title" />
				<input v-model="editTask.description" />
				<select v-model="editTask.status">
				<option value="todo">To Do</option>
				<option value="in progress">In Progress</option>
				<option value="done">Done</option>
				</select>
				<button @click="saveEdit(task._id)">Save</button>
				<button @click="cancelEdit">Cancel</button>
			</div>
			<div v-else>
				<strong>{{ task.title }}</strong> — {{ task.status }}
				<br />
				{{ task.description }}
				<br />
				<button @click="startEdit(task)">Edit</button>
				<button @click="removeTask(task._id)">Delete</button>
			</div>
			</li>
		</ul>
		<!-- Collaborators Section -->
		<h3>Collaborators</h3>

		<!-- Add collaborator form -->
		<form @submit.prevent="submitCollaborator">
		<input v-model="collabEmail" type="email" placeholder="Enter user email" required />
		<button type="submit">Add Collaborator</button>
		</form>

		<!-- List collaborators -->
		<ul>
			<li v-for="user in project.collaborators" :key="user._id">
				{{ user.name || user.email }}
				<button @click="remove(user._id)">Remove</button>
			</li>
		</ul>

	</div>
</template>




<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProjectById, createTask, updateTask, deleteTask } from '../services/api';
import { addCollaborator, removeCollaborator } from '../services/api';

const route = useRoute();
const token = localStorage.getItem('token');

const project = ref(null);
const tasks = ref([]);
const newTask = ref({
	title: '',
	description: '',
	status: 'todo',
});
const editingTaskId = ref(null);
const editTask = ref({});

async function loadProject() {
	const res = await fetchProjectById(route.params.id, token);
	project.value = res.project;
	tasks.value = res.tasks;
}

onMounted(loadProject);

async function submitTask() {
	await createTask(project.value._id, newTask.value, token);
	newTask.value = { title: '', description: '', status: 'todo' };
	await loadProject();
}

function startEdit(task) {
	editingTaskId.value = task._id;
	editTask.value = { ...task };
}

function cancelEdit() {
	editingTaskId.value = null;
	editTask.value = {};
}

async function saveEdit(taskId) {
	await updateTask(taskId, editTask.value, token);
	editingTaskId.value = null;
	await loadProject();
}

async function removeTask(taskId) {
	await deleteTask(taskId, token);
	await loadProject();
}

const collabEmail = ref('');

async function submitCollaborator() {
	const res = await addCollaborator(project.value._id, collabEmail.value, token);
	if (res.error) {
		alert(res.error);
	} else {
		collabEmail.value = '';
		await loadProject();
	}
}

async function remove(userId) {
	if (confirm("Are you sure you want to remove this collaborator?")) {
		const res = await removeCollaborator(project.value._id, userId, token);
		if (!res.error) await loadProject();
		else alert(res.error);
	}
}

</script>
