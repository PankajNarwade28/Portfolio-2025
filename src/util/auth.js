import { jwtDecode } from "jwt-decode";
import { supabase } from "../lib/supabase";

const TOKEN_KEY = "authToken";

export const authService = {
  // ✅ SUPABASE LOGIN
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const token = data.session.access_token;

      localStorage.setItem(TOKEN_KEY, token);

      return {
        success: true,
        token,
        user: data.user,
      };

    } catch (err) {
      return { success: false, error: "Login failed" };
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    localStorage.clear();
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  getUser: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? jwtDecode(token) : null;
  },

  getAuthHeader: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};