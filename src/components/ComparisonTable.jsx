import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "./ComparisonTable.css";
import "./ModernSectionTitle.css";

const ComparisonTable = () => {
    const sectionRef = useRef(null);
    const tableRef = useRef(null);
    const [activeTab, setActiveTab] = useState("minimal");

    const comparisonData = [
        {
            category: "Price",
            minimal: [
                "Transparent cost structure and material specification.",
                "Flexible budget suggestions."
            ],
            typical: [
                "30-50% hike between first quote and final cost."
            ]
        },
        {
            category: "Convenience",
            minimal: [
                "One-stop service point for all interior and exterior needs."
            ],
            typical: [
                "You'll need 30-40 vendors to gather everything."
            ]
        },
        {
            category: "Design",
            minimal: [
                "Personalized design with 3D visuals."
            ],
            typical: [
                "Ordinary design and visuals.",
                "Compromised functions and utilities."
            ]
        },
        {
            category: "Timelines",
            minimal: [
                "50-day move-in*"
            ],
            typical: [
                "Lengthy project period.",
                "Surprise delays."
            ]
        },
        {
            category: "Communication",
            minimal: [
                "We provide a Gantt chart.",
                "Regular updates with project tracking."
            ],
            typical: [
                "Irregular updates & follow-up.",
                "No proper documentation."
            ]
        },
        {
            category: "Quality",
            minimal: [
                "We use branded materials.",
                "154 quality checks."
            ],
            typical: [
                "Inferior materials to cut costs.",
                "Less than 20 quality checks."
            ]
        },
        {
            category: "Warranty",
            minimal: [
                "1 year hardware guarantee.",
                "2 years of free service warranty."
            ],
            typical: [
                "Lack of commitment",
                "No valid warranty policy"
            ]
        },
        {
            category: "After-sales support",
            minimal: [
                "Dedicated team for prompt response."
            ],
            typical: [
                "Insufficient capability for quick support."
            ]
        }
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const table = tableRef.current;
        const rows = table.querySelectorAll(".comparison-row");
        const title = section.querySelector(".section-title h2");
        const subtitle = section.querySelector(".section-title p");
        const tabs = section.querySelectorAll(".comparison-tab");

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
                }
            }
        );

        // Animate the tabs
        gsap.fromTo(
            tabs,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                }
            }
        );

        // Animate the table rows
        gsap.fromTo(
            rows,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: table,
                    start: "top 80%",
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        
        // Animate the change
        const rows = tableRef.current.querySelectorAll(".comparison-row");
        
        gsap.fromTo(
            rows,
            { opacity: 0.5, x: tab === "minimal" ? -20 : 20 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: "power2.out"
            }
        );
    };

    return (
        <section className="section comparison" ref={sectionRef} id="comparison">
            <div className="container">
                <div className="section-title">
                    <h2>How We Are Standing Out</h2>
                    <p>We focus on adding minimal value to everything we do; see it for yourself.</p>
                </div>

                <div className="comparison-tabs">
                    <div 
                        className={`comparison-tab ${activeTab === "minimal" ? "active" : ""}`}
                        onClick={() => handleTabChange("minimal")}
                    >
                        <span className="tab-label">Minimal Experience</span>
                    </div>
                    <div 
                        className={`comparison-tab ${activeTab === "typical" ? "active" : ""}`}
                        onClick={() => handleTabChange("typical")}
                    >
                        <span className="tab-label">Typical Experience</span>
                    </div>
                </div>

                <div className="comparison-table-container">
                    <div className="comparison-table" ref={tableRef}>
                        {comparisonData.map((item, index) => (
                            <div className="comparison-row" key={index}>
                                <div className="comparison-category">
                                    <h3>{item.category}</h3>
                                </div>
                                <div className="comparison-content">
                                    {activeTab === "minimal" ? (
                                        <div className="minimal-content">
                                            {item.minimal.map((point, i) => (
                                                <div className="comparison-point positive" key={i}>
                                                    <span className="point-icon">✓</span>
                                                    <span className="point-text">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="typical-content">
                                            {item.typical.map((point, i) => (
                                                <div className="comparison-point negative" key={i}>
                                                    <span className="point-icon">✕</span>
                                                    <span className="point-text">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="comparison-note">
                    <p>* Conditions apply. Timeline may vary based on project scope and complexity.</p>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
