// Mobile nav toggle
(function() {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('nav__menu--open');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('nav__menu--open');
      });
    });
  }
})();

// RAY letters spotlight effect — dim siblings on hover
(function() {
  document.querySelectorAll('.ray-letters').forEach(function(group) {
    var letters = group.querySelectorAll('.ray-letter');
    letters.forEach(function(letter) {
      letter.addEventListener('mouseenter', function() {
        letters.forEach(function(l) {
          if (l !== letter) {
            l.style.opacity = '0.4';
            l.style.transition = 'opacity 300ms ease';
          }
        });
      });
      letter.addEventListener('mouseleave', function() {
        letters.forEach(function(l) {
          l.style.opacity = '';
        });
      });
    });
  });
})();

// Scroll-reveal animations using IntersectionObserver
(function() {
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Stagger: find this element's index among its siblings with .reveal
          var parent = entry.target.parentElement;
          if (parent) {
            var siblings = Array.prototype.filter.call(
              parent.querySelectorAll(':scope > .reveal'),
              function(el) { return el === entry.target || true; }
            );
            var index = siblings.indexOf(entry.target);
            if (index >= 0) {
              entry.target.style.transitionDelay = (index * 80) + 'ms';
            }
          }
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealElements.forEach(function(el) {
      el.classList.add('reveal--visible');
    });
  }
})();

// Nav scroll shadow
(function() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }, { passive: true });
})();

// Back to top button
(function() {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;

  var heroEl = document.querySelector('.hero');
  var scrollThreshold = heroEl ? heroEl.offsetHeight : 400;

  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      btn.classList.add('back-to-top--visible');
    } else {
      btn.classList.remove('back-to-top--visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Day 1 lesson sidebar — active TOC highlight on scroll
(function() {
  var tocLinks = document.querySelectorAll('.lesson__toc-link');
  var topics = document.querySelectorAll('.lesson__topic');
  if (tocLinks.length === 0 || topics.length === 0) return;

  if ('IntersectionObserver' in window) {
    var tocObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          tocLinks.forEach(function(link) {
            link.classList.remove('lesson__toc-link--active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('lesson__toc-link--active');
            }
          });
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-80px 0px -60% 0px'
    });

    topics.forEach(function(topic) {
      tocObserver.observe(topic);
    });
  }
})();
