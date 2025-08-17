// API integration layer for the page builder
// Update BASE_URL to match your backend
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Auth
export function login(data) {
  return apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) });
}
export function signup(data) {
  return apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(data) });
}
export function logout() {
  return apiRequest('/auth/logout', { method: 'POST' });
}
export function getCurrentUser() {
  return apiRequest('/auth/me');
}

// Templates
export function saveTemplate(data) {
  return apiRequest('/templates', { method: 'POST', body: JSON.stringify(data) });
}
export function loadTemplates() {
  return apiRequest('/templates');
}
export function loadTemplate(id) {
  return apiRequest(`/templates/${id}`);
}

// Sections
export function saveSection(data) {
  return apiRequest('/sections', { method: 'POST', body: JSON.stringify(data) });
}
export function loadSections() {
  return apiRequest('/sections');
}

// Export
export function exportHtmlCss(data) {
  return apiRequest('/export', { method: 'POST', body: JSON.stringify(data) });
}
