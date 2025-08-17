// React hook for template CRUD operations
import { useState, useCallback } from "react";
import { saveTemplate, loadTemplates, loadTemplate } from "./index";

export function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadTemplates();
      setTemplates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const save = useCallback(async (template) => {
    setLoading(true);
    setError(null);
    try {
      await saveTemplate(template);
      await fetchTemplates();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTemplates]);

  const load = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await loadTemplate(id);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { templates, loading, error, fetchTemplates, save, load };
}
