import { useScrollReveal } from "./hooks/useScrollReveal.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Stats from "./components/Stats/Stats.jsx";
import Services from "./components/Services/Services.jsx";
import Guarantee from "./components/Guarantee/Guarantee.jsx";
import Projects from "./components/Projects/Projects.jsx";
import WorkerProfile from "./components/WorkerProfile/WorkerProfile.jsx";
import About from "./components/About/About.jsx";
import Faq from "./components/Faq/Faq.jsx";
import CTA from "./components/CTA/CTA.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        {/* <Projects /> */}
        <WorkerProfile />
        <Guarantee />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
