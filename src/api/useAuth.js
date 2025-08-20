// React hook for authentication (login, signup, logout, current user)
import { useState, useCallback } from "react";
import { login, signup, logout, getCurrentUser } from "./index";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (err) {
      setUser(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const doLogin = useCallback(async (creds) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(creds);
      setUser(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const doSignup = useCallback(async (creds) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signup(creds);
      setUser(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const doLogout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, fetchUser, doLogin, doSignup, doLogout };
}
