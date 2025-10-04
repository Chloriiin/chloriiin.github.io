import DocsLayout from "./components/sections/notion/DocsLayout";
import HeroSection from "./components/sections/hero/HeroSection";
import NotionSection from "./components/sections/notion/content/NotionSection";
//import PfpWrapper from "./components/shared/PfpWrapper";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <HeroSection id="hero" />
        <DocsLayout id="notion">
          <NotionSection />
        </DocsLayout>
      </div>
    </div>
  );
}
