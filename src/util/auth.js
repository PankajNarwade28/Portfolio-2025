import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "authToken";

// Get the backend URL from environment or default to localhost
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const authService = {
  // Login function
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem(TOKEN_KEY, data.token);
      return { success: true, token: data.token, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = authService.getToken();
    
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      // Check if token is expired
      if (decoded.exp * 1000 > Date.now()) {
        return true;
      } else {
        authService.logout(); // Remove expired token
        return false;
      }
    } catch (err) {
      authService.logout(); // Remove invalid token
      return false;
    }
  },

  // Get decoded token data
  getUser: () => {
    const token = authService.getToken();
    
    if (!token) {
      return null;
    }

    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  },

  // Verify token with backend (optional)
  verifyToken: async () => {
    const token = authService.getToken();
    
    if (!token) {
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data.valid;
    } catch (error) {
      return false;
    }
  },

  // Get authorization header for API calls
  getAuthHeader: () => {
    const token = authService.getToken();
    return token ? { "Authorization": `Bearer ${token}` } : {};
  },
};
