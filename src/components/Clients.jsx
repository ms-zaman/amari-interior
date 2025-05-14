import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "./Clients.css";
import "./ModernSectionTitle.css";

const Clients = () => {
    const sectionRef = useRef(null);
    const clientsRef = useRef([]);

    // Client logos with colorful SVG designs
    const clients = [
        {
            name: "Luxury Homes",
            logo: "/images/clients/luxury-homes-logo.svg",
            category: "Residential",
        },
        {
            name: "Urban Cafe",
            logo: "/images/clients/urban-cafe-logo.svg",
            category: "Commercial",
        },
        {
            name: "Serenity Spa",
            logo: "/images/clients/serenity-spa-logo.svg",
            category: "Commercial",
        },
        {
            name: "Tech Innovations",
            logo: "/images/clients/tech-innovations-logo.svg",
            category: "Office",
        },
        {
            name: "Dhaka Residences",
            logo: "/images/clients/dhaka-residences-logo.svg",
            category: "Residential",
        },
        {
            name: "Harmony Hotels",
            logo: "/images/clients/harmony-hotels-logo.svg",
            category: "Hospitality",
        },
        {
            name: "Modern Living",
            logo: "/images/clients/modern-living-logo.svg",
            category: "Residential",
        },
        {
            name: "Gourmet Restaurant",
            logo: "/images/clients/gourmet-restaurant-logo.svg",
            category: "Commercial",
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const clientElements = clientsRef.current.filter(Boolean);
        const title = section.querySelector(".section-title h2");
        const subtitle = section.querySelector(".section-title p");

        // Animate the title and subtitle
        gsap.fromTo(
            [title, subtitle],
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
            }
        );

        // Animate the client logos
        gsap.fromTo(
            clientElements,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section.querySelector(".clients-grid"),
                    start: "top 80%",
                },
            }
        );

        // Create a continuous horizontal scroll animation for the marquee
        const marqueeElements = section.querySelectorAll(
            ".clients-marquee-content"
        );

        marqueeElements.forEach((el) => {
            gsap.to(el, {
                xPercent: -100,
                repeat: -1,
                duration: 25,
                ease: "linear",
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="section clients" ref={sectionRef} id="clients">
            <div className="container">
                <div className="section-title">
                    <h2>Our Clients</h2>
                    <p>Trusted by leading businesses and homeowners in Dhaka</p>
                </div>

                <div className="clients-grid">
                    {clients.map((client, index) => (
                        <div
                            className="client-card"
                            key={index}
                            ref={(el) => (clientsRef.current[index] = el)}
                        >
                            <div className="client-logo">
                                <img src={client.logo} alt={client.name} />
                            </div>
                            <div className="client-info">
                                <h3>{client.name}</h3>
                                <p>{client.category}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="clients-marquee">
                    <div className="clients-marquee-track">
                        <div className="clients-marquee-content">
                            {clients.map((client, index) => (
                                <div
                                    className="marquee-item"
                                    key={`marquee-1-${index}`}
                                >
                                    <span>{client.name}</span>
                                    <span className="marquee-dot">•</span>
                                </div>
                            ))}
                        </div>
                        <div className="clients-marquee-content">
                            {clients.map((client, index) => (
                                <div
                                    className="marquee-item"
                                    key={`marquee-2-${index}`}
                                >
                                    <span>{client.name}</span>
                                    <span className="marquee-dot">•</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="clients-cta">
                    <p>Join our growing list of satisfied clients</p>
                    <a href="#contact" className="btn-primary">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Clients;
