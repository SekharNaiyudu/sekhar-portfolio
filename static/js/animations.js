/* ============================================================
   JSB PORTFOLIO - UNIQUE REPEAT SCROLL ANIMATIONS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const animationGroups = {

        /* ABOUT */
        about: [
            [".about-section .section-heading", "reveal-heading"],
            [".about-section .section-tag", "reveal-left"],
            [".about-section .about-content > p:nth-of-type(1)", "reveal-left"],
            [".about-section .about-content > p:nth-of-type(2)", "reveal-left-delay"],
            [".about-section .about-content > p:nth-of-type(3)", "reveal-left-delay-2"],
            [".about-section .about-highlights > div:nth-child(1)", "reveal-number"],
            [".about-section .about-highlights > div:nth-child(2)", "reveal-number-delay"],
            [".about-section .about-highlights > div:nth-child(3)", "reveal-number-delay-2"],
            [".about-section .about-profile-image", "reveal-image"]
        ],

        /* SKILLS */
        skills: [
            [".skills-section .section-heading", "reveal-heading"],
            [".skills-section .skill-card:nth-child(1)", "reveal-card-left"],
            [".skills-section .skill-card:nth-child(2)", "reveal-card-up"],
            [".skills-section .skill-card:nth-child(3)", "reveal-card-right"],
            [".skills-section .skill-card:nth-child(4)", "reveal-card-up-delay"],
            [".skills-section .skill-card:nth-child(5)", "reveal-card-left-delay"]
        ],

        /* EXPERIENCE */
        experience: [
            [".experience-section .section-heading", "reveal-heading"],
            [".experience-section .timeline-item:nth-child(1)", "reveal-timeline-left"],
            [".experience-section .timeline-item:nth-child(2)", "reveal-timeline-right"]
        ],

        /* PROJECTS */
        projects: [
            [".projects-section .section-heading", "reveal-heading"],
            [".projects-section .project-card:nth-child(1)", "reveal-project-1"],
            [".projects-section .project-card:nth-child(2)", "reveal-project-2"],
            [".projects-section .project-card:nth-child(3)", "reveal-project-3"],
            [".projects-section .project-card:nth-child(4)", "reveal-project-4"],
            [".projects-section .project-card:nth-child(5)", "reveal-project-5"],
            [".projects-section .project-card:nth-child(6)", "reveal-project-6"]
        ],

        /* CERTIFICATES */
        certificates: [
            [".certificates-section .section-heading", "reveal-heading"],
            [".certificates-section .certificate-card:nth-child(1)", "reveal-certificate-1"],
            [".certificates-section .certificate-card:nth-child(2)", "reveal-certificate-2"],
            [".certificates-section .certificate-card:nth-child(3)", "reveal-certificate-3"],
            [".certificates-section .certificate-card:nth-child(4)", "reveal-certificate-4"]
        ],

        /* EDUCATION */
        education: [
            [".education-section .section-heading", "reveal-heading"],
            [".education-section .education-card", "reveal-education"]
        ],

        /* KNOWLEDGE */
        knowledge: [
            [".knowledge-section .section-heading", "reveal-heading"],
            [".knowledge-section .knowledge-item:nth-child(1)", "reveal-knowledge-1"],
            [".knowledge-section .knowledge-item:nth-child(2)", "reveal-knowledge-2"],
            [".knowledge-section .knowledge-item:nth-child(3)", "reveal-knowledge-3"],
            [".knowledge-section .knowledge-item:nth-child(4)", "reveal-knowledge-4"],
            [".knowledge-section .knowledge-item:nth-child(5)", "reveal-knowledge-5"],
            [".knowledge-section .knowledge-item:nth-child(6)", "reveal-knowledge-6"],
            [".knowledge-section .knowledge-item:nth-child(7)", "reveal-knowledge-7"],
            [".knowledge-section .knowledge-item:nth-child(8)", "reveal-knowledge-8"]
        ],

        /* MENTORING */
        mentoring: [
            [".mentoring-section .section-heading", "reveal-heading"],
            [".mentoring-section .mentoring-text", "reveal-left"],
            [".mentoring-section .mentor-image.image-one", "reveal-gallery-1"],
            [".mentoring-section .mentor-image.image-two", "reveal-gallery-2"],
            [".mentoring-section .mentor-image.image-three", "reveal-gallery-3"],
            [".mentoring-section .mentor-image.image-four", "reveal-gallery-4"],
            [".mentoring-section .mentor-terminal", "reveal-terminal"]
        ],

        /* CONTACT */
        contact: [
            [".contact-section .section-heading", "reveal-heading"],
            [".contact-section .contact-item:nth-child(1)", "reveal-contact-1"],
            [".contact-section .contact-item:nth-child(2)", "reveal-contact-2"],
            [".contact-section .contact-item:nth-child(3)", "reveal-contact-3"],
            [".contact-section .contact-item:nth-child(4)", "reveal-contact-4"],
            [".contact-section .contact-item:nth-child(5)", "reveal-contact-5"],
            [".contact-section .contact-terminal", "reveal-terminal"]
        ]
    };


    /* Add animation classes */
    Object.values(animationGroups).forEach(group => {

        group.forEach(([selector, className]) => {

            document.querySelectorAll(selector).forEach(element => {

                element.classList.add("scroll-item");
                element.classList.add(className);

            });

        });

    });


    /* Observer */
    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("animate-in");

                } else {

                    entry.target.classList.remove("animate-in");

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    document.querySelectorAll(".scroll-item").forEach(element => {
        observer.observe(element);
    });

});