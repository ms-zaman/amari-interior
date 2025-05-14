import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import "./App.css";
import About from "./components/About";
import Clients from "./components/Clients";
import ComparisonTable from "./components/ComparisonTable";
import Contact from "./components/Contact";
import Header from "./components/Header/Header";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Services from "./components/Services";
import SimpleFooter from "./components/SimpleFooter";
import Testimonials from "./components/Testimonials";

function App() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <ReactLenis root>
            <div className="min-h-screen bg-white text-fg font-sans">
                <Header />
                <Hero />
                <About />
                <Services />
                <Projects />
                <Process />
                <ComparisonTable />
                <Clients />
                <Testimonials />
                <Contact />
                <SimpleFooter />
            </div>
        </ReactLenis>
    );
}

export default App;
