const BASE_URL = import.meta.env.VITE_API_URL;

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchProjects(token) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

export async function fetchProjectById(id, token) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
	  headers: {
		Authorization: `Bearer ${token}`,
	  },
	});
	return res.json();
  }
  