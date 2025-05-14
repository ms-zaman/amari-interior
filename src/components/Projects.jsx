import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "./ModernSectionTitle.css";
import "./Projects.css";

const Projects = () => {
    const sectionRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState("all");
    const [hoveredProject, setHoveredProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: "Modern Apartment Renovation",
            category: "Residential",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
            description:
                "Complete renovation of a 2-bedroom apartment with a minimalist design approach.",
            year: "2023",
            client: "Private Client",
        },
        {
            id: 2,
            title: "Luxury Villa Interior",
            category: "Residential",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
            description:
                "Interior design for a luxury villa featuring custom furniture and premium materials.",
            year: "2022",
            client: "Johnson Family",
        },
        {
            id: 3,
            title: "Boutique Cafe Design",
            category: "Commercial",
            image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop",
            description:
                "Full interior design for a boutique cafe with a warm and inviting atmosphere.",
            year: "2023",
            client: "Brew & Co.",
        },
        {
            id: 4,
            title: "Corporate Office Redesign",
            category: "Commercial",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop",
            description:
                "Modern office redesign focusing on productivity and employee well-being.",
            year: "2021",
            client: "TechSphere Inc.",
        },
        {
            id: 5,
            title: "Minimalist Home Makeover",
            category: "Residential",
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
            description:
                "Complete home makeover with a focus on minimalist design and functionality.",
            year: "2022",
            client: "Private Client",
        },
        {
            id: 6,
            title: "Restaurant Interior Design",
            category: "Commercial",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
            description:
                "Elegant restaurant interior design with custom lighting and furniture.",
            year: "2023",
            client: "Gourmet Dining Group",
        },
    ];

    const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter((project) => project.category === activeFilter);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;

        gsap.fromTo(
            section.querySelectorAll(".project-card"),
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
    }, [activeFilter]);

    return (
        <section className="section projects" ref={sectionRef} id="projects">
            <div className="container">
                <div className="section-title">
                    <h2>Our Projects</h2>
                    <p>Showcasing our finest interior transformations</p>
                </div>

                <div className="projects-filter">
                    <button
                        className={`filter-btn ${
                            activeFilter === "all" ? "active" : ""
                        }`}
                        onClick={() => setActiveFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${
                            activeFilter === "Residential" ? "active" : ""
                        }`}
                        onClick={() => setActiveFilter("Residential")}
                    >
                        Residential
                    </button>
                    <button
                        className={`filter-btn ${
                            activeFilter === "Commercial" ? "active" : ""
                        }`}
                        onClick={() => setActiveFilter("Commercial")}
                    >
                        Commercial
                    </button>
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project) => (
                        <div
                            className="project-card"
                            key={project.id}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div
                                    className={`project-overlay ${
                                        hoveredProject === project.id
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <div className="project-details">
                                        <div className="project-meta">
                                            <span>{project.year}</span>
                                            <span>{project.client}</span>
                                        </div>
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <a href="#" className="project-link">
                                            View Project{" "}
                                            <span className="arrow">→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-info">
                                <span className="project-category">
                                    {project.category}
                                </span>
                                <h3>{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="projects-cta">
                    <a href="#" className="btn-modern">
                        <span>View All Projects</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
