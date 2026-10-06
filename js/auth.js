// Demo login only. Accounts live in this file and the session lives in the
// browser, so this is not real security. Real accounts need a backend.
const DEMO_USERS = [
  { username: "student", password: "student123", name: "Aarav Sharma", role: "Student", detail: "Class 8 – A" },
  { username: "parent", password: "parent123", name: "Sunita Sharma", role: "Parent", detail: "Parent of Aarav (Class 8 – A)" },
  { username: "teacher", password: "teacher123", name: "Mr. R. K. Tiwari", role: "Teacher", detail: "Science department" },
];
const SESSION_KEY = "rpms-user";

const Auth = {
  login(username, password) {
    const user = DEMO_USERS.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (!user) return null;
    const { password: _, ...profile } = user;
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(profile)); } catch (e) {}
    return profile;
  },
  logout() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  },
  currentUser() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
  },
};

// Header link shows "Login" or "My portal" depending on the session
const authLink = document.getElementById("auth-link");
if (authLink && Auth.currentUser()) {
  authLink.textContent = "My portal";
  authLink.href = "portal.html";
}
