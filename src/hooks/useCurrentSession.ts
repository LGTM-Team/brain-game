import { useEffect, useState } from "react";
import { supabase } from "@/api/service/supabase/supabase";
import type { Session, User } from "@supabase/supabase-js";

interface UseCurrentSessionResult {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export function useCurrentSession(): UseCurrentSessionResult {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (error) {
          setError(error.message);
          setUser(null);
          setSession(null);
        } else {
          setUser(data.session?.user ?? null);
          setSession(data.session ?? null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message ?? "Unknown error");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, session, loading, error };
}
