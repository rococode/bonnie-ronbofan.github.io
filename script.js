/* ============================================
   ronbofan.com — Shared JavaScript
   ============================================ */

(function() {
    'use strict';

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const stored = localStorage.getItem('theme');

    if (stored) {
        html.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
    }

    function updateIcon() {
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = html.getAttribute('data-theme') === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
        }
    }
    updateIcon();

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon();
        });
    }

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
        });

        // Close nav on link click (mobile)
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
            });
        });

        // Close nav on outside click
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.site-nav')) {
                navLinks.classList.remove('open');
            }
        });
    }

    // --- Back to Top ---
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Reading Progress Bar ---
    var progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var scrolled = (window.scrollY / docHeight) * 100;
            progressBar.style.width = Math.min(scrolled, 100) + '%';
        }, { passive: true });
    }

    // --- Fade In on Scroll ---
    var fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length > 0) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        fadeEls.forEach(function(el) { observer.observe(el); });
    }

    // --- Proficiency Bar Animation ---
    var bars = document.querySelectorAll('.proficiency-fill');
    if (bars.length > 0) {
        var barObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var target = entry.target;
                    var width = target.getAttribute('data-width');
                    if (width) {
                        target.style.width = width;
                    }
                    barObserver.unobserve(target);
                }
            });
        }, { threshold: 0.3 });

        bars.forEach(function(bar) { barObserver.observe(bar); });
    }

    // --- Active Nav Link ---
    var currentPath = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        var href = link.getAttribute('href').replace(/\.html$/, '').replace(/\/$/, '') || '/';
        if (href === currentPath || (currentPath.startsWith('/insights/') && href === '/insights')) {
            link.classList.add('active');
        }
    });

})();
