import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "./Experience.css";
import "./ModernSectionTitle.css";

const Experience = () => {
    const sectionRef = useRef(null);

    const experiences = [
        {
            year: "2018-Present",
            title: "Lead Interior Designer",
            company: "Amari Interior Design Studio",
            description:
                "Leading a team of designers to create innovative and functional interior spaces for residential and commercial clients.",
        },
        {
            year: "2015-2018",
            title: "Senior Interior Designer",
            company: "Modern Spaces Inc.",
            description:
                "Designed and executed high-end residential projects, focusing on sustainable and eco-friendly design solutions.",
        },
        {
            year: "2012-2015",
            title: "Interior Designer",
            company: "Urban Design Collective",
            description:
                "Collaborated on commercial and hospitality projects, developing design concepts and material selections.",
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;

        gsap.fromTo(
            section.querySelectorAll(".experience-item"),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            className="section experience"
            ref={sectionRef}
            id="experience"
        >
            <div className="container">
                <div className="section-title">
                    <h2>Our Experience</h2>
                    <p>Years of expertise in transforming spaces</p>
                </div>

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <div className="experience-item" key={index}>
                            <div className="experience-year">{exp.year}</div>
                            <div className="experience-content">
                                <h3>{exp.title}</h3>
                                <h4>{exp.company}</h4>
                                <p>{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
