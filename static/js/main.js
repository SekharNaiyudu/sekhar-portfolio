/* =========================================================
   JSB CYBERSECURITY PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("JSB Portfolio: DOM loaded");

    /* -----------------------------------------------------
       PRELOADER
    ----------------------------------------------------- */

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hide");

            document.body.classList.add("site-loaded");

        }, 2300);

    }


    /* -----------------------------------------------------
       MOBILE MENU
    ----------------------------------------------------- */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("mobile-open");

        });

    }


    /* -----------------------------------------------------
       SMOOTH NAVIGATION
    ----------------------------------------------------- */

    document.querySelectorAll(
        '.nav-menu a[href^="#"], .logo[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* -----------------------------------------------------
       3D MOUSE PARALLAX
    ----------------------------------------------------- */

    const cards =
        document.querySelectorAll(
            ".skill-card, .project-card, .certificate-card, .knowledge-item, .stat-card, .education-card"
        );


    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* -----------------------------------------------------
       HERO 3D MOUSE MOVEMENT
    ----------------------------------------------------- */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual) {

        document.addEventListener("mousemove", event => {

            const x =
                (window.innerWidth / 2 - event.clientX)
                / window.innerWidth;

            const y =
                (window.innerHeight / 2 - event.clientY)
                / window.innerHeight;

            heroVisual.style.transform =
                `perspective(1000px)
                 rotateY(${x * 8}deg)
                 rotateX(${y * -6}deg)`;

        });

    }


    /* -----------------------------------------------------
       ACTIVE NAVIGATION
    ----------------------------------------------------- */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        );


    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href")
                === `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    });


    console.log(
        "JSB Portfolio initialized successfully"
    );

});


/* =========================================
   REPEAT SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll(".section");

    sections.forEach(function (section) {
        section.classList.add("scroll-reveal");
    });

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });

});