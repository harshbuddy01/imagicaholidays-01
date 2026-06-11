// Server Component — fetches CRM data at request time, no client-side useEffect
import { villas as staticVillas } from "@/lib/constants";
import { fetchWebsiteConfig } from "@/lib/api";
import VillaSlider from "./VillaSlider";

export default async function VillasSection() {
  // Fetch on the server so data is in the HTML before Swiper initialises
  const data = await fetchWebsiteConfig();

  const villasConfig = data?.config?.villas;
  const items =
    villasConfig?.items && villasConfig.items.length > 0
      ? villasConfig.items
      : staticVillas;

  const sectionTitle = villasConfig?.title || "Exclusive Stays";
  const sectionSubtitle =
    villasConfig?.subtitle || "Your Exclusive Tranquil Haven at IMAGICA HOLIDAYS";

  return (
    <VillaSlider
      villas={items}
      sectionTitle={sectionTitle}
      sectionSubtitle={sectionSubtitle}
    />
  );
}
