const loader = document.querySelector('.full-loader')

window.addEventListener('load', ()=> {
loader.style.display = 'none';
})


// feature coursse slider on homepage
const swiper = new Swiper('.feat-course-swip', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    autoplay: {
        delay: 4000
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        769: {
            slidesPerView: 2,
        },

        1200: {
            slidesPerView: 3
        }
        
    }
})


// related coursse slider on course details page
const relatedCourseSlider = new Swiper('.relatedCourseSwiper',{
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    autoplay: {
        delay: 4000
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        769: {
            slidesPerView: 2,
        },

        1200: {
            slidesPerView: 3
        }
        
    }
})


// join page login registere form
// Form Switch Logic
document.addEventListener('DOMContentLoaded', function() {
    const authBtns = document.querySelectorAll('.auth-btn');
    const forms = document.querySelectorAll('.auth-form');

    authBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and forms
            authBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked button and corresponding form
            btn.classList.add('active');
            const formClass = btn.dataset.form + '-form';
            document.querySelector('.' + formClass).classList.add('active');
        });
    });
});


// Add this to your main.js file

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.myNav');
    if (window.scrollY > 300) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
    
});

// back to top 
window.addEventListener('DOMContentLoaded', ()=> {
    const backTopBtn = document.querySelector('#backTop')

    window.addEventListener('scroll', ()=>{
        if(window.scrollY > 400){
            backTopBtn.style.display = 'block'
        }else{
            backTopBtn.style.display = 'none'
        }
    })

    backTopBtn.addEventListener('click', ()=> {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
})


// Course Filter Logic
function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = selectFilters[0].value.toLowerCase();
    const selectedDuration = selectFilters[1].value.toLowerCase();
    const selectedFeeRange = selectFilters[2].value.toLowerCase();
    const selectedModes = Array.from(modeOptions)
        .filter(option => option.checked)
        .map(option => option.value);

    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        const category = card.dataset.category;
        const duration = card.dataset.duration;
        const fee = parseInt(card.dataset.fee);
        const mode = card.dataset.mode;
        const title = card.querySelector('.course-title').textContent.toLowerCase();
        const description = card.querySelector('.course-desc').textContent.toLowerCase();

        let isVisible = true;

        // Search term filter
        if (searchTerm) {
            isVisible = title.includes(searchTerm) || description.includes(searchTerm);
        }

        // Category filter
        if (selectedCategory !== 'select category' && isVisible) {
            isVisible = category === selectedCategory;
        }

        // Duration filter
        if (selectedDuration !== 'duration' && isVisible) {
            isVisible = duration === selectedDuration;
        }

        // Fee range filter
        if (selectedFeeRange !== 'fee range' && isVisible) {
            const [min, max] = selectedFeeRange.split(' - ')
                .map(val => parseInt(val.replace(/[^0-9]/g, '')));
            isVisible = fee >= min && fee <= max;
        }

        // Study mode filter
        if (selectedModes.length > 0 && isVisible) {
            isVisible = selectedModes.includes(mode);
        }

        // Show/hide card
        card.closest('.col-md-4').style.display = isVisible ? 'block' : 'none';
    });

    // Show "no results" message if needed
    const visibleCards = document.querySelectorAll('.course-card[style="display: block"]');
    const noResultsMsg = document.querySelector('.no-results-message') || 
        createNoResultsMessage();
    
    noResultsMsg.style.display = visibleCards.length === 0 ? 'block' : 'none';
}

function createNoResultsMessage() {
    const msg = document.createElement('div');
    msg.className = 'no-results-message text-center py-5';
    msg.innerHTML = `
        <h3>No Courses Found</h3>
        <p>Try adjusting your search criteria</p>
    `;
    document.querySelector('.allcourseBox').appendChild(msg);
    return msg;
}
