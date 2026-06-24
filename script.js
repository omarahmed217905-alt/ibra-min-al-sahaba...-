// 1. شريط تقدم القراءة
window.onscroll = function() { updateProgressBar() };

function updateProgressBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
}

// 2. تأثيرات الظهور عند التمرير (Scroll Animation)
function revealElements() {
    let reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 100; 
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealElements);
revealElements(); 

// 3. فتح وإغلاق قائمة الدروس المستفادة (Accordion)
function toggleLessons(element) {
    element.classList.toggle("active");
    let content = element.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

// 4. زر التفاعل (الإعجاب بالقصة) - مع حفظ البيانات
function toggleLike(btn) {
    const storyId = btn.getAttribute('data-id');
    let countSpan = btn.querySelector('.like-count');
    let icon = btn.querySelector('.like-icon');
    let currentCount = parseInt(countSpan.innerText);

    if (btn.classList.contains('liked')) {
        // إلغاء الإعجاب
        btn.classList.remove('liked');
        countSpan.innerText = currentCount - 1;
        icon.innerText = '🤍';
        
        // حفظ في localStorage
        localStorage.setItem(storyId + '-liked', 'false');
        localStorage.setItem(storyId + '-count', countSpan.innerText);
    } else {
        // إضافة إعجاب
        btn.classList.add('liked');
        countSpan.innerText = currentCount + 1;
        icon.innerText = '💛';
        
        // حفظ في localStorage
        localStorage.setItem(storyId + '-liked', 'true');
        localStorage.setItem(storyId + '-count', countSpan.innerText);
    }
}

// تحميل حالة الإعجابات عند فتح الصفحة
function loadLikes() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(btn => {
        const storyId = btn.getAttribute('data-id');
        if (!storyId) return;

        const savedLiked = localStorage.getItem(storyId + '-liked');
        const savedCount = localStorage.getItem(storyId + '-count');
        
        const countSpan = btn.querySelector('.like-count');
        const icon = btn.querySelector('.like-icon');

        if (savedCount) {
            countSpan.innerText = savedCount;
        }

        if (savedLiked === 'true') {
            btn.classList.add('liked');
            icon.innerText = '💛';
        } else {
            btn.classList.remove('liked');
            icon.innerText = '🤍';
        }
    });
}

// تشغيل تحميل الإعجابات عند تحميل الصفحة
window.addEventListener('load', loadLikes);