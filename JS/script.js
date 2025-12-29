// Portfolio Slider Pagination
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.portfolio-slider');
    const dots = document.querySelectorAll('.dot');
    const items = document.querySelectorAll('.portfolio-item');
    
    if (!slider || dots.length === 0) return;

    function computeItemWidth() {
        return slider.clientWidth;
    }

    let itemWidth = computeItemWidth();
    let currentIndex = 0;
    
    // Update active dot based on scroll position
    function updateActiveDot() {
        const scrollLeft = slider.scrollLeft;
        const itemIndex = Math.round(scrollLeft / itemWidth);
        
        dots.forEach((dot, index) => {
            if (index === itemIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentIndex = itemIndex;
        
        // Update counter
        const counter = document.querySelector('.portfolio-counter .current');
        if (counter) {
            counter.textContent = itemIndex + 1;
        }
    }
    
    // Scroll to item when dot is clicked
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            itemWidth = computeItemWidth();
            const scrollPosition = index * itemWidth;
            slider.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            currentIndex = index;
            updateActiveDot();
        });
    });
    
    // Update dots on scroll
    slider.addEventListener('scroll', updateActiveDot);
    
    // Handle arrow button navigation
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            itemWidth = computeItemWidth();
            currentIndex = currentIndex - 1;
            if (currentIndex < 0) {
                currentIndex = items.length - 1;
            }
            slider.scrollTo({ left: currentIndex * itemWidth, behavior: 'smooth' });
            updateActiveDot();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            itemWidth = computeItemWidth();
            currentIndex = currentIndex + 1;
            if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            slider.scrollTo({ left: currentIndex * itemWidth, behavior: 'smooth' });
            updateActiveDot();
        });
    }

    // Recompute widths on resize/load to avoid skipping due to layout changes
    window.addEventListener('resize', () => {
        itemWidth = computeItemWidth();
        updateActiveDot();
    });
    window.addEventListener('load', () => {
        itemWidth = computeItemWidth();
        updateActiveDot();
    });
});

// FAQ Toggle
document.addEventListener('DOMContentLoaded', function() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            faqItem.classList.toggle('active');
        });
    });
});

// Burger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const burgerToggle = document.getElementById('burger-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenu = document.getElementById('close-menu');
    
    if (burgerToggle) {
        burgerToggle.addEventListener('click', function() {
            menuOverlay.classList.add('active');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
        });
    }
    
    // Close menu when a link is clicked
    const menuLinks = menuOverlay.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = menuOverlay.contains(event.target);
        const isClickOnBurgerButton = burgerToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnBurgerButton && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Set CSS variable for header height to keep hero fully visible
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (!header) return;

    function setHeaderHeight() {
        const h = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', h + 'px');
    }

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
});

// Fullscreen Image Overlay for .content-image
document.addEventListener('DOMContentLoaded', function() {
    const contentImages = document.querySelectorAll('.content-image');
    if (!contentImages || contentImages.length === 0) return;

    function openImageOverlay(src, altText) {
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-overlay';
        closeBtn.setAttribute('aria-label', 'Close image');
        closeBtn.innerHTML = '&times;';

        const img = document.createElement('img');
        img.src = src;
        img.alt = altText || '';

        overlay.appendChild(closeBtn);
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        document.body.classList.add('no-scroll');

        function close() {
            document.body.classList.remove('no-scroll');
            overlay.remove();
            document.removeEventListener('keydown', onKeydown);
        }

        function onKeydown(e) {
            if (e.key === 'Escape') close();
        }

        // Close on button
        closeBtn.addEventListener('click', close);
        // Close when clicking backdrop
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) close();
        });
        // Close on Escape
        document.addEventListener('keydown', onKeydown);
    }

    contentImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            openImageOverlay(img.src, img.alt);
        });
    });
});
