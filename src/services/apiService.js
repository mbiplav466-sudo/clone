// Frontend API service to communicate with backend REST server

const API_BASE = '/api';

export async function fetchWithAuth(url, options = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API Request failed');
  }

  return data;
}

export const api = {
  // Auth
  register: (payload) => fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getMe: (token) => fetchWithAuth('/auth/me', { method: 'GET' }, token),

  // Vitals
  getVitals: (token) => fetchWithAuth('/health/vitals', { method: 'GET' }, token),
  addVital: (log, token) => fetchWithAuth('/health/vitals', { method: 'POST', body: JSON.stringify(log) }, token),
  deleteVital: (id, token) => fetchWithAuth(`/health/vitals/${id}`, { method: 'DELETE' }, token),

  // Meds
  getMeds: (token) => fetchWithAuth('/health/meds', { method: 'GET' }, token),
  addMed: (med, token) => fetchWithAuth('/health/meds', { method: 'POST', body: JSON.stringify(med) }, token),
  deleteMed: (id, token) => fetchWithAuth(`/health/meds/${id}`, { method: 'DELETE' }, token),

  // Labs
  getLabs: (token) => fetchWithAuth('/health/labs', { method: 'GET' }, token),
  addLab: (lab, token) => fetchWithAuth('/health/labs', { method: 'POST', body: JSON.stringify(lab) }, token),

  // Chat
  getChats: (token) => fetchWithAuth('/health/chat', { method: 'GET' }, token),
  saveChats: (messages, token) => fetchWithAuth('/health/chat', { method: 'POST', body: JSON.stringify({ messages }) }, token)
};
