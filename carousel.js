/* Case study carousel: auto-scrolls until the visitor uses the arrows or swipes,
   then stays manual until the row leaves the screen and comes back. */
(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SPEED = 0.4; // px per frame

    document.querySelectorAll('[data-carousel]').forEach(function (section) {
        const scroller = section.querySelector('.case-studies-scroll');
        const track = section.querySelector('.case-studies-track');
        const prevBtn = section.querySelector('[data-carousel-prev]');
        const nextBtn = section.querySelector('[data-carousel-next]');
        if (!scroller || !track) return;

        // Very wide screens show every card at once: keep native layout, hide arrows.
        if (window.innerWidth >= 1940) {
            section.querySelectorAll('.cs-arrows').forEach(function (a) { a.hidden = true; });
            return;
        }

        scroller.classList.add('js-carousel');
        const cards = track.children;
        const total = cards.length;
        const n = total / 2; // originals followed by one set of clones

        let x = 0, auto = !reduceMotion, hovering = false, anim = null, visible = true;

        const step = () => cards[1].offsetLeft - cards[0].offsetLeft;
        const setWidth = () => step() * n;
        const setX = (v) => { x = v; track.style.transform = 'translateX(' + (-x) + 'px)'; };
        const wrap = () => {
            const w = setWidth();
            if (x >= w) setX(x - w);
            if (x < 0) setX(x + w);
        };

        function tick() {
            if (auto && visible && !hovering && !anim) { setX(x + SPEED); wrap(); }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        function animateTo(target) {
            cancelAnimationFrame(anim);
            const from = x, start = performance.now(), duration = reduceMotion ? 1 : 420;
            const ease = (t) => 1 - Math.pow(1 - t, 3);
            const frame = (now) => {
                const t = Math.min(1, (now - start) / duration);
                setX(from + (target - from) * ease(t));
                if (t < 1) { anim = requestAnimationFrame(frame); } else { anim = null; wrap(); }
            };
            anim = requestAnimationFrame(frame);
        }

        function go(dir) {
            auto = false;
            const s = step();
            if (dir < 0 && x - s < -1) setX(x + setWidth()); // jump into the clone set so there is room to move back
            const target = dir > 0 ? (Math.floor(x / s + 0.01) + 1) * s : (Math.ceil(x / s - 0.01) - 1) * s;
            animateTo(target);
        }

        if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

        scroller.addEventListener('mouseenter', function () { hovering = true; });
        scroller.addEventListener('mouseleave', function () { hovering = false; });

        // Swipe and drag, one card per gesture
        let startX = null, originX = 0, moved = false;
        scroller.addEventListener('pointerdown', function (e) {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            startX = e.clientX; originX = x; moved = false;
        });
        window.addEventListener('pointermove', function (e) {
            if (startX === null) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 6) {
                moved = true; auto = false;
                cancelAnimationFrame(anim); anim = null;
                let v = originX - dx;
                if (v < 0) { v += setWidth(); originX += setWidth(); }
                setX(v);
            }
        });
        window.addEventListener('pointerup', function (e) {
            if (startX === null) return;
            const dx = e.clientX - startX;
            startX = null;
            if (!moved) return;
            const s = step();
            const target = Math.abs(dx) > 40 ? (dx < 0 ? Math.ceil(x / s) : Math.floor(x / s)) * s : Math.round(x / s) * s;
            animateTo(target);
        });
        // A drag should not open the card it started on
        track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);

        // Hand auto-scroll back once the row has left the screen
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) { visible = false; if (!reduceMotion) auto = true; }
                    else { visible = true; }
                });
            }).observe(section);
        }

        window.addEventListener('resize', function () { setX(Math.round(x / step()) * step()); wrap(); });
    });
})();
