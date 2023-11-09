import { writable } from 'svelte/store';

export const session = writable(null);


export async function checkSession() {
  try {
    const response = await fetch('http://localhost:8080/api/auth/checkAuth');
    if (response.ok) {
      const userData = await response.json();
      session.set(userData);
    } else {
      session.set(null);
    }
  } catch (error) {
    console.error('Error checking session', error);
    session.set(null);
  }
}


export async function logout() {
  try {
    const response = await fetch('http://localhost:8080/api/auth/logout');
    if (response.ok) {
      session.set(null);
    }
  } catch (error) {
    console.error('Error logging out', error);
  }
}
