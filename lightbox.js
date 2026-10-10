// Click or tap a case study image to view it large. Esc, the close button or the backdrop closes it.
(function () {
    const images = document.querySelectorAll('.cs-figure img');
    if (!images.length || !window.HTMLDialogElement) return;

    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Image viewer');
    dialog.innerHTML =
        '<button type="button" class="lightbox-close" aria-label="Close image">Close</button>' +
        '<div class="lightbox-stage"><img alt=""></div>' +
        '<p class="lightbox-caption"></p>';
    document.body.appendChild(dialog);

    const stage = dialog.querySelector('.lightbox-stage');
    const large = stage.querySelector('img');
    const caption = dialog.querySelector('.lightbox-caption');
    let opener = null;

    function open(img) {
        opener = img;
        large.src = img.currentSrc || img.src;
        large.alt = img.alt;
        const figcaption = img.closest('figure')?.querySelector('figcaption');
        caption.textContent = figcaption ? figcaption.textContent.replace(' Scroll sideways to follow it.', '') : '';
        caption.hidden = !figcaption;
        dialog.classList.remove('is-zoomed');
        dialog.showModal();
    }

    images.forEach((img) => {
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'View larger: ' + img.alt);
        img.addEventListener('click', () => open(img));
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(img);
            }
        });
    });

    // Tap the large image to switch between fit-to-screen and full size
    large.addEventListener('click', (e) => {
        e.stopPropagation();
        const zoomed = dialog.classList.toggle('is-zoomed');
        if (zoomed) {
            const x = e.offsetX / large.clientWidth;
            const y = e.offsetY / large.clientHeight;
            requestAnimationFrame(() => {
                stage.scrollLeft = x * stage.scrollWidth - stage.clientWidth / 2;
                stage.scrollTop = y * stage.scrollHeight - stage.clientHeight / 2;
            });
        }
    });

    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog || e.target === stage) dialog.close();
    });
    dialog.addEventListener('close', () => {
        large.removeAttribute('src');
        opener?.focus({ preventScroll: true });
    });
})();
