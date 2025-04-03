import Navbar from "./(Header)/Navbar";
import Herobody from "./(Header)/Herobody";
import About from "./(About)/About";
import Skill from "./(Skills)/Skill";
import Project from "./(Projects)/Project";
import Contact from "./(Contact)/Contact";
import AppNavbar from "@/components/app-navbar";
import Experience from "./(Experience)/Experience";
import Scroll from "../components/Scroller";
import Semi from "@/components/Semi";

export default function Home() {
  return (
    <>
      <Scroll />
      <div className="h-screen w-screen bg-black">
        {/* Hide the semi-circle on small devices (below sm) */}
        <Semi/>
        <div className="sticky top-10 h-12 left-1/2 -translate-x-1/2 w-[50%] rounded-xl shadow-lg">
          <Navbar />
        </div>
        <Herobody />
        <AppNavbar />
      </div>
      <div className="h-full md:h-[85vh] w-screen">
        <About />
      </div>
      <div className="h-full w-screen">
        <Skill />
      </div>
      <div className="h-full w-screen">
        <Experience />
      </div>
      <div className="h-full w-screen">
        <Project />
      </div>
      <div className="h-[80vh] md:h-full w-screen">
        <Contact />
      </div>
    </>
  );
}