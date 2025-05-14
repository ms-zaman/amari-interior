import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "./About.css";
import AnimatedCopy from "./AnimatedCopy/AnimatedCopy";
import "./ModernSectionTitle.css";

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;

        // Animate stats with a more dynamic sequence
        gsap.fromTo(
            section.querySelectorAll(".about-stat"),
            { y: 30, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
            }
        );

        // Animate image with a subtle reveal
        gsap.fromTo(
            section.querySelector(".about-image"),
            { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
            {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1.2,
                ease: "power4.out",
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
        <section className="section about" ref={sectionRef} id="about">
            <div className="about-bg-pattern"></div>
            <div className="container">
                <div className="section-title">
                    <h2>Why Dhaka Trusts Amari</h2>
                    <p>
                        Transforming spaces into extraordinary experiences since
                        2018
                    </p>
                </div>

                <div className="about-content">
                    <div className="about-text">
                        <div className="about-image">
                            <img
                                src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=800&auto=format&fit=crop"
                                alt="Interior design team at work"
                            />
                            <div className="image-overlay">
                                <span>Crafting Excellence</span>
                            </div>
                        </div>
                        <AnimatedCopy tag="p" stagger={0.03} delay={0.2}>
                            Since 2018, Amari Interior Renovation has been
                            transforming spaces with our commitment to quality
                            craftsmanship and innovative design solutions. We
                            understand that your space is a reflection of your
                            personality and lifestyle, which is why we work
                            closely with you to create interiors that are not
                            just beautiful, but functional and tailored to your
                            specific needs.
                        </AnimatedCopy>
                        <AnimatedCopy tag="p" stagger={0.03} delay={0.3}>
                            Our team of experienced designers and skilled
                            craftsmen combine creativity with technical
                            expertise to deliver exceptional results on time and
                            within budget. Whether you're looking to renovate
                            your home, design a new office space, or create a
                            stunning commercial interior, we have the expertise
                            to bring your vision to life.
                        </AnimatedCopy>
                    </div>

                    <div className="about-stats">
                        <div className="about-stat">
                            <div className="stat-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </div>
                            <div className="stat-number">
                                <span className="counter">100</span>+
                            </div>
                            <div className="stat-label">Completed Projects</div>
                        </div>

                        <div className="about-stat">
                            <div className="stat-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div className="stat-number">
                                <span className="counter">5</span>+
                            </div>
                            <div className="stat-label">Years Experience</div>
                        </div>

                        <div className="about-stat">
                            <div className="stat-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </div>
                            <div className="stat-number">
                                <span className="counter">85</span>%
                            </div>
                            <div className="stat-label">Client Repeat Rate</div>
                        </div>

                        <div className="about-stat">
                            <div className="stat-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div className="stat-number">
                                <span className="counter">15</span>+
                            </div>
                            <div className="stat-label">
                                Expert Team Members
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
