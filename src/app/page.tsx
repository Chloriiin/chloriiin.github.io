import MainLayout from "../components/layout/MainLayout";
import LandingSection from "../components/sections/home/LandingSection";
import ContentSection from "../components/sections/home/ContentSection";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <section className="snap-start h-screen">
          <LandingSection />
        </section>
        <section className="snap-start h-screen">
          <MainLayout>
            <ContentSection />
          </MainLayout>
        </section>
      </div>
    </div>
  );
}
