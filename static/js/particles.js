/* =========================================================
   JSB GLOBAL CYBER PARTICLES
   Dense Cyber Network Background
========================================================= */

const canvas = document.getElementById("particleCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let particles = [];

    const mouse = {
        x: null,
        y: null,
        radius: 180
    };


    /* =====================================================
       SETTINGS
    ===================================================== */

    const SETTINGS = {

        /* More particles */
        particleDensity: 430,

        /* Maximum particles for performance */
        maxParticles: 450,

        /* Connection distance */
        connectionDistance: 175,

        /* Particle movement */
        speed: 0.32,

        /* Particle size */
        minSize: 0.45,
        maxSize: 1.8,

        /* Connection opacity */
        lineOpacity: 0.24

    };


    /* =====================================================
       RESIZE
    ===================================================== */

    function resizeCanvas() {

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        canvas.width =
            window.innerWidth * dpr;

        canvas.height =
            window.innerHeight * dpr;

        canvas.style.width =
            window.innerWidth + "px";

        canvas.style.height =
            window.innerHeight + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        createParticles();
    }


    /* =====================================================
       PARTICLE CLASS
    ===================================================== */

    class Particle {

        constructor() {

            this.x =
                Math.random() * width;

            this.y =
                Math.random() * height;


            /* Slow random movement */

            this.vx =
                (Math.random() - 0.5)
                * SETTINGS.speed;

            this.vy =
                (Math.random() - 0.5)
                * SETTINGS.speed;


            /* Random particle size */

            this.size =
                SETTINGS.minSize +
                Math.random() *
                (
                    SETTINGS.maxSize -
                    SETTINGS.minSize
                );


            /* Random brightness */

            this.alpha =
                Math.random() * 0.65 +
                0.20;


            /* Some particles brighter */

            this.glow =
                Math.random() > 0.82;


            /* Slight cyan variation */

            this.cyan =
                Math.random() > 0.94;

        }


        /* -------------------------------------------------
           UPDATE
        ------------------------------------------------- */

        update() {

            this.x += this.vx;

            this.y += this.vy;


            /* Wrap horizontally */

            if (this.x < -10) {
                this.x = width + 10;
            }

            if (this.x > width + 10) {
                this.x = -10;
            }


            /* Wrap vertically */

            if (this.y < -10) {
                this.y = height + 10;
            }

            if (this.y > height + 10) {
                this.y = -10;
            }


            /* -------------------------------------------------
               MOUSE INTERACTION
            ------------------------------------------------- */

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {

                const dx =
                    this.x - mouse.x;

                const dy =
                    this.y - mouse.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance > 0 &&
                    distance < mouse.radius
                ) {

                    const force =
                        (
                            mouse.radius -
                            distance
                        ) /
                        mouse.radius;


                    this.x +=
                        (
                            dx / distance
                        ) *
                        force *
                        0.45;


                    this.y +=
                        (
                            dy / distance
                        ) *
                        force *
                        0.45;

                }

            }

        }


        /* -------------------------------------------------
           DRAW
        ------------------------------------------------- */

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );


            /* Cyan accent particles */

            if (this.cyan) {

                ctx.fillStyle =
                    `rgba(
                        0,
                        229,
                        255,
                        ${this.alpha}
                    )`;

                ctx.shadowBlur = 8;

                ctx.shadowColor =
                    "rgba(0,229,255,0.55)";

            }

            else {

                ctx.fillStyle =
                    `rgba(
                        255,
                        23,
                        68,
                        ${this.alpha}
                    )`;

                if (this.glow) {

                    ctx.shadowBlur = 9;

                    ctx.shadowColor =
                        "rgba(255,23,68,0.65)";

                }

                else {

                    ctx.shadowBlur = 3;

                    ctx.shadowColor =
                        "rgba(255,23,68,0.25)";

                }

            }


            ctx.fill();

            ctx.shadowBlur = 0;

        }

    }


    /* =====================================================
       CREATE PARTICLES
    ===================================================== */

    function createParticles() {

        particles = [];


        /*
            Instead of calculating a very low number
            from screen area, use a fixed dense amount.
        */

        let amount =
            SETTINGS.particleDensity;


        /*
            Slightly increase particles on large screens.
        */

        if (width > 1800) {

            amount = 450;

        }

        else if (width > 1400) {

            amount = 420;

        }

        else if (width > 1000) {

            amount = 380;

        }

        else if (width > 700) {

            amount = 300;

        }

        else {

            amount = 190;

        }


        amount =
            Math.min(
                amount,
                SETTINGS.maxParticles
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    /* =====================================================
       CONNECTIONS
    ===================================================== */

    function drawConnections() {

        const maxDistance =
            SETTINGS.connectionDistance;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x;

                const dy =
                    particles[i].y -
                    particles[j].y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    maxDistance
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            maxDistance
                        ) *
                        SETTINGS.lineOpacity;


                    ctx.beginPath();


                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );


                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );


                    /*
                        Mostly red network
                    */

                    ctx.strokeStyle =
                        `rgba(
                            255,
                            23,
                            68,
                            ${opacity}
                        )`;


                    ctx.lineWidth =
                        0.55;


                    ctx.stroke();

                }

            }

        }

    }


    /* =====================================================
       MOUSE CONNECTIONS
    ===================================================== */

    function drawMouseConnections() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {

            return;

        }


        const mouseDistance =
            190;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const dx =
                particles[i].x -
                mouse.x;

            const dy =
                particles[i].y -
                mouse.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                mouseDistance
            ) {

                const opacity =
                    (
                        1 -
                        distance /
                        mouseDistance
                    ) *
                    0.32;


                ctx.beginPath();


                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );


                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );


                ctx.strokeStyle =
                    `rgba(
                        0,
                        229,
                        255,
                        ${opacity}
                    )`;


                ctx.lineWidth =
                    0.7;


                ctx.stroke();

            }

        }

    }


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* Network */

        drawConnections();


        /* Mouse interaction */

        drawMouseConnections();


        /* Particles */

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            particles[i].update();

            particles[i].draw();

        }


        requestAnimationFrame(
            animate
        );

    }


    /* =====================================================
       MOUSE MOVE
    ===================================================== */

    window.addEventListener(
        "mousemove",
        function (event) {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       MOUSE LEAVE
    ===================================================== */

    window.addEventListener(
        "mouseleave",
        function () {

            mouse.x = null;

            mouse.y = null;

        }
    );


    /* =====================================================
       START
    ===================================================== */

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    resizeCanvas();

    animate();

}