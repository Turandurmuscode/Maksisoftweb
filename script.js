window.onload = function() {
    // Aktif menüyü işaretle
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Fade-in animasyonu için gözlemci
    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Sticky header gölgelendirme
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (!header) return;
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.93)';
        }
    });

    // Mobil menü (isteğe bağlı)
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('nav ul');
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert("✅ Mesajınız alındı, teşekkür ederiz!");
                    form.reset();
                } else {
                    alert("⚠️ Mesaj gönderilirken bir sorun oluştu.");
                }
            }).catch(error => {
                alert("❌ Bir hata oluştu: " + error.message);
            });
        });
    }
});
// Animated Numbers (İstatistik sayıları)
const counters = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-container');

let started = false;

function animateNumbers() {
    if (started) return;
    started = true;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText;
            const increment = Math.ceil(target / 100); // animasyon hızı

            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target.toLocaleString(); // 12000 → 12.000
            }
        };
        updateCount();
    });
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.disconnect();
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    observer.observe(statsSection);
}
form.addEventListener("submit", function (e) {
    if (typeof grecaptcha !== "undefined") {
        var response = grecaptcha.getResponse();
        if (response.length === 0) {
            e.preventDefault();
            alert("Lütfen 'Ben robot değilim' kutusunu işaretleyin.");
            return false;
        }
    }
});
function sanitizeInput(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}