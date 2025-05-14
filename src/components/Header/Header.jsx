import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: "smooth",
            });
        }
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 py-5 transition-all duration-300 ${
                isScrolled
                    ? "bg-white shadow-md py-4"
                    : "bg-black bg-opacity-20"
            }`}
        >
            <div className="w-[90%] max-w-[1200px] mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <a
                            href="#"
                            onClick={() => scrollToSection("hero")}
                            className="block"
                        >
                            <span className="flex flex-col leading-none">
                                <span className="text-3xl font-bold text-primary">
                                    AMARI
                                </span>
                                <span
                                    className={`text-base font-medium tracking-wider ${
                                        isScrolled
                                            ? "text-secondary"
                                            : "text-white"
                                    }`}
                                >
                                    INTERIOR
                                </span>
                            </span>
                        </a>
                    </div>

                    <nav className="hidden lg:block">
                        <ul className="flex">
                            <li className="ml-8">
                                <a
                                    href="#about"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("about");
                                    }}
                                    className={`relative font-semibold text-base transition-colors hover:text-primary ${
                                        isScrolled ? "text-fg" : "text-white"
                                    } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-5px] after:left-0 after:transition-all hover:after:w-full`}
                                >
                                    About
                                </a>
                            </li>
                            <li className="ml-8">
                                <a
                                    href="#services"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("services");
                                    }}
                                    className={`relative font-semibold text-base transition-colors hover:text-primary ${
                                        isScrolled ? "text-fg" : "text-white"
                                    } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-5px] after:left-0 after:transition-all hover:after:w-full`}
                                >
                                    Services
                                </a>
                            </li>
                            <li className="ml-8">
                                <a
                                    href="#projects"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("projects");
                                    }}
                                    className={`relative font-semibold text-base transition-colors hover:text-primary ${
                                        isScrolled ? "text-fg" : "text-white"
                                    } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-5px] after:left-0 after:transition-all hover:after:w-full`}
                                >
                                    Projects
                                </a>
                            </li>
                            <li className="ml-8">
                                <a
                                    href="#process"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("process");
                                    }}
                                    className={`relative font-semibold text-base transition-colors hover:text-primary ${
                                        isScrolled ? "text-fg" : "text-white"
                                    } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-5px] after:left-0 after:transition-all hover:after:w-full`}
                                >
                                    Process
                                </a>
                            </li>
                            <li className="ml-8">
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("contact");
                                    }}
                                    className={`relative font-semibold text-base transition-colors hover:text-primary ${
                                        isScrolled ? "text-fg" : "text-white"
                                    } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:bottom-[-5px] after:left-0 after:transition-all hover:after:w-full`}
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div
                        className="block lg:hidden cursor-pointer"
                        onClick={toggleMobileMenu}
                    >
                        <div className="w-[30px] h-[20px] relative">
                            <span
                                className={`block absolute h-[3px] w-full rounded-sm left-0 transition-all duration-300 ${
                                    isScrolled ? "bg-fg" : "bg-white"
                                } ${
                                    isMobileMenuOpen
                                        ? "top-2 rotate-45"
                                        : "top-0"
                                }`}
                            ></span>
                            <span
                                className={`block absolute h-[3px] w-full rounded-sm left-0 top-2 transition-all duration-300 ${
                                    isScrolled ? "bg-fg" : "bg-white"
                                } ${
                                    isMobileMenuOpen
                                        ? "opacity-0"
                                        : "opacity-100"
                                }`}
                            ></span>
                            <span
                                className={`block absolute h-[3px] w-full rounded-sm left-0 transition-all duration-300 ${
                                    isScrolled ? "bg-fg" : "bg-white"
                                } ${
                                    isMobileMenuOpen
                                        ? "top-2 -rotate-45"
                                        : "top-4"
                                }`}
                            ></span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white z-[999] flex items-center justify-center transition-all duration-300 ${
                    isMobileMenuOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-full"
                }`}
            >
                <nav className="w-full">
                    <ul className="list-none p-0 m-0 text-center">
                        <li className="my-5">
                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("about");
                                }}
                                className="text-2xl text-fg font-semibold transition-colors hover:text-primary"
                            >
                                About
                            </a>
                        </li>
                        <li className="my-5">
                            <a
                                href="#services"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("services");
                                }}
                                className="text-2xl text-fg font-semibold transition-colors hover:text-primary"
                            >
                                Services
                            </a>
                        </li>
                        <li className="my-5">
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("projects");
                                }}
                                className="text-2xl text-fg font-semibold transition-colors hover:text-primary"
                            >
                                Projects
                            </a>
                        </li>
                        <li className="my-5">
                            <a
                                href="#process"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("process");
                                }}
                                className="text-2xl text-fg font-semibold transition-colors hover:text-primary"
                            >
                                Process
                            </a>
                        </li>
                        <li className="my-5">
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("contact");
                                }}
                                className="text-2xl text-fg font-semibold transition-colors hover:text-primary"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
