import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "./ModernSectionTitle.css";
import "./Services.css";

const Services = () => {
    const sectionRef = useRef(null);

    const services = [
        {
            icon: "design",
            title: "Interior Design",
            description:
                "Custom interior design solutions that blend aesthetics with functionality to create spaces that reflect your personality and lifestyle.",
        },
        {
            icon: "architecture",
            title: "Architectural & Structural Design",
            description:
                "Comprehensive architectural and structural design services to ensure your space is not just beautiful but also structurally sound.",
        },
        {
            icon: "kitchen",
            title: "Kitchen Cabinet",
            description:
                "Custom kitchen cabinet solutions that maximize storage while enhancing the aesthetic appeal of your kitchen space.",
        },
        {
            icon: "ceiling",
            title: "False Ceiling",
            description:
                "Innovative false ceiling designs that add dimension to your space while concealing wiring and improving acoustics.",
        },
        {
            icon: "painting",
            title: "Decorative Painting",
            description:
                "Expert painting services that transform your walls into works of art, using premium paints and techniques.",
        },
        {
            icon: "renovation",
            title: "Renovation & Remodeling",
            description:
                "Complete renovation and remodeling services to breathe new life into your existing spaces, enhancing both form and function.",
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;

        gsap.fromTo(
            section.querySelectorAll(".service-card"),
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
        <section className="section services" ref={sectionRef} id="services">
            <div className="container">
                <div className="section-title">
                    <h2>Our Services</h2>
                    <p>
                        Comprehensive interior design and renovation solutions
                        for every space
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-icon">
                                <img
                                    src={`/icons/${service.icon}.svg`}
                                    alt={service.title}
                                />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <a href="#contact" className="service-link">
                                Learn More
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
