import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "./ModernSectionTitle.css";
import "./Process.css";

const Process = () => {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);
    const [activeStep, setActiveStep] = useState(null);
    const timelineRef = useRef(null);
    const stepsRefs = useRef([]);

    const processSteps = [
        {
            number: "01",
            title: "Consultation",
            description:
                "We begin with an in-depth consultation to understand your vision, requirements, and budget constraints.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
            ),
        },
        {
            number: "02",
            title: "Concept Development",
            description:
                "Our team creates detailed design concepts based on your requirements, incorporating innovative solutions.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
            ),
        },
        {
            number: "03",
            title: "Design Presentation",
            description:
                "We present our designs with 3D visualizations, material samples, and detailed specifications for your approval.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M2 15h10"></path>
                    <path d="M9 18l3-3-3-3"></path>
                </svg>
            ),
        },
        {
            number: "04",
            title: "Implementation",
            description:
                "Once approved, our skilled craftsmen bring the designs to life with precision and attention to detail.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="M2 2l7.586 7.586"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                </svg>
            ),
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Try to register premium plugins that are now free
        try {
            // Import the plugins dynamically
            import("gsap/DrawSVGPlugin")
                .then((module) => {
                    const DrawSVGPlugin = module.DrawSVGPlugin;
                    gsap.registerPlugin(DrawSVGPlugin);

                    import("gsap/MotionPathPlugin")
                        .then((module) => {
                            const MotionPathPlugin = module.MotionPathPlugin;
                            gsap.registerPlugin(MotionPathPlugin);
                            console.log(
                                "GSAP premium plugins loaded successfully!"
                            );
                        })
                        .catch((error) => {
                            console.warn(
                                "MotionPathPlugin not available:",
                                error
                            );
                        });
                })
                .catch((error) => {
                    console.warn("DrawSVGPlugin not available:", error);
                });
        } catch (error) {
            console.warn("Error loading GSAP plugins:", error);
        }

        const section = sectionRef.current;
        const path = pathRef.current;
        const steps = stepsRefs.current;

        // Create a main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 20%",
                scrub: 0.5,
            },
        });

        // Initialize the path
        gsap.set(path, { drawSVG: "0%" });

        // Animate the path drawing
        tl.to(path, {
            drawSVG: "100%",
            duration: 1,
            ease: "power2.inOut",
        });

        // Create animations for each step
        steps.forEach((step, index) => {
            const progress = index / (steps.length - 1);

            // Create a marker that follows the path
            const marker = document.createElement("div");
            marker.className = "path-marker";
            section
                .querySelector(".process-path-container")
                .appendChild(marker);

            // Position the marker along the path
            gsap.set(marker, {
                motionPath: {
                    path: path,
                    align: path,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                    start: 0,
                    end: 0,
                },
            });

            // Animate the marker along the path
            tl.to(
                marker,
                {
                    motionPath: {
                        path: path,
                        align: path,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true,
                        start: 0,
                        end: progress,
                    },
                    duration: 0.25,
                },
                "<"
            );

            // Animate each step
            tl.to(
                step,
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    onStart: () => {
                        if (index > 0) {
                            gsap.to(
                                steps[index - 1].querySelector(
                                    ".process-step-inner"
                                ),
                                {
                                    boxShadow:
                                        "0 10px 30px rgba(0, 0, 0, 0.05)",
                                    duration: 0.3,
                                }
                            );
                        }

                        gsap.to(step.querySelector(".process-step-inner"), {
                            boxShadow:
                                "0 15px 40px rgba(var(--primary-rgb), 0.2)",
                            duration: 0.3,
                        });

                        gsap.to(step.querySelector(".process-icon"), {
                            scale: 1.1,
                            duration: 0.3,
                        });
                    },
                },
                "<"
            );
        });

        // Store the timeline for later use
        timelineRef.current = tl;

        // Initial setup for steps
        gsap.set(steps, { opacity: 0.5, y: 30, scale: 0.95 });

        // Create hover animations for each step
        steps.forEach((step, index) => {
            step.addEventListener("mouseenter", () => {
                setActiveStep(index);

                gsap.to(step.querySelector(".process-step-inner"), {
                    boxShadow: "0 20px 50px rgba(var(--primary-rgb), 0.25)",
                    y: -10,
                    duration: 0.3,
                });

                gsap.to(step.querySelector(".process-icon"), {
                    scale: 1.2,
                    duration: 0.3,
                });

                gsap.to(step.querySelector(".process-number"), {
                    opacity: 1,
                    scale: 1.1,
                    duration: 0.3,
                });
            });

            step.addEventListener("mouseleave", () => {
                setActiveStep(null);

                gsap.to(step.querySelector(".process-step-inner"), {
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08)",
                    y: 0,
                    duration: 0.3,
                });

                gsap.to(step.querySelector(".process-icon"), {
                    scale: 1,
                    duration: 0.3,
                });

                gsap.to(step.querySelector(".process-number"), {
                    opacity: 0.5,
                    scale: 1,
                    duration: 0.3,
                });
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="section process" ref={sectionRef} id="process">
            <div className="process-bg-gradient"></div>
            <div className="container">
                <div className="section-title">
                    <h2>Our Process</h2>
                    <p>How we transform your vision into reality</p>
                </div>

                <div className="process-container">
                    <div className="process-path-container">
                        <svg
                            className="process-path"
                            viewBox="0 0 1200 200"
                            preserveAspectRatio="none"
                        >
                            <path
                                ref={pathRef}
                                d="M0,100 C300,20 500,180 800,100 C1000,40 1100,150 1200,100"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="4"
                                strokeDasharray="5,5"
                            />
                            <defs>
                                <linearGradient
                                    id="gradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="var(--primary)"
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="var(--secondary)"
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="process-steps">
                        {processSteps.map((step, index) => (
                            <div
                                className={`process-step ${
                                    activeStep === index ? "active" : ""
                                }`}
                                key={index}
                                ref={(el) => (stepsRefs.current[index] = el)}
                            >
                                <div className="process-step-inner">
                                    <div className="process-icon">
                                        {step.icon}
                                    </div>
                                    <div className="process-number">
                                        {step.number}
                                    </div>
                                    <div className="process-content">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                    <div className="process-indicator">
                                        <span className="indicator-dot"></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
