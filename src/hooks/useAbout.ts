import { useEffect, useState } from "react";
import { supabase, type About as AboutBase } from "../lib/supabase";

type AboutExtended = AboutBase & {
  banner?: string;
  intro?: string;

  block1_title?: string;
  block1_text?: string;
  block1_image?: string;

  block2_title?: string;
  block2_text?: string;
  block2_image?: string;

  closing_title?: string;
  closing_text?: string;
};

export default function useAbout() {
  const [aboutData, setAboutData] = useState<AboutExtended | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      const { data, error } = await supabase
        .from("about")
        .select("*")
        .eq("is_active", true)
        .maybeSingle();

      if (!error && data) {
        setAboutData(data as AboutExtended);
      }
    }

    fetchAbout();
  }, []);

  const defaultData: AboutExtended = {
    id: "",
    heading: "Design Inspired by You",
    tagline: "Transforming spaces into refined living experiences",
    description:
      "At AAM All Construction, we turn your project into refined living experiences that reflect your lifestyle.",
    button_text: "Discover More",
    image_url: "/about.jpeg",
    is_active: true,
    created_at: "",

    // 👇 NUEVOS CAMPOS (fallback)
    banner: "/about-banner.png",
    intro:
      "At AAM All Construction, we stand out as leaders in the construction and remodeling industry in Tampa Bay, Florida.",

    block1_title: "Built on Trust & Precision",
    block1_text:
      "Our focus is on providing tailored solutions that meet the unique needs of every project.",
    block1_image: "/about1.jpeg",

    block2_title: "More Than Construction",
    block2_text:
      "We believe in building not only exceptional spaces but also lasting relationships.",
    block2_image: "/about2.jpeg",

    closing_title: "We Turn Ideas Into Reality",
    closing_text:
      "We create spaces that reflect style, functionality, and durability.",
  };

  return aboutData || defaultData;
}