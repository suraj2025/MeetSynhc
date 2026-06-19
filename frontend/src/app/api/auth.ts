const API_BASE = "http://localhost:8080";

export async function getCurrentUser() {
  const token = localStorage.getItem("jwt_token");
  if (!token) return null;

  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    localStorage.removeItem("jwt_token");
    return null;
  }

  return res.json();
}