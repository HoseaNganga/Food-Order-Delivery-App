import HeroSection from "@/Components/HeroSection/HeroSection";
import HomeMenu from "@/Components/HomeMenu/HomeMenu";
import AboutHome from "@/Components/AboutHome/AboutHome";
import HomeContact from "@/Components/HomeContact/HomeContact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeMenu />
      <AboutHome />
      <HomeContact />
    </>
  );
}
