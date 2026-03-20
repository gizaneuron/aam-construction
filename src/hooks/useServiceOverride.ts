import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useServiceOverride(slug: string) {

  const [override, setOverride] = useState<any>(null);

  useEffect(() => {

    async function fetchOverride() {

      const { data, error } = await supabase
        .from("services_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle(); // 👈 CAMBIO CLAVE

      if (!error && data) {
        setOverride(data);
      }

    }

    fetchOverride();

  }, [slug]);

  return override;

}