// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        } else {
            // if want to use animation that repeats on scroll use this
            sec.classList.remove('show-animate');
        }
    });

    // sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');
    let scrollable = document.documentElement.scrollHeight - window.innerHeight;
    let scrolled = window.scrollY;

    if (Math.ceil(scrolled) === scrollable) {
        footer.classList.add('show-animate');
    } else {
        footer.classList.remove('show-animate');
    }
}

// contact form sender with retry mechanism and spam protection
$('#contact-form').on('submit', function(event) {
    event.preventDefault(); // prevent reload

    const lastSent = localStorage.getItem('lastSent');
    const now = new Date().getTime();
    const oneHour = 60 * 60 * 1000;

    if (lastSent && (now - lastSent < oneHour)) {
        alert('You can only send one message per hour.');
        return;
    }

    let formData = new FormData(this);
    formData.append('service_id', 'service_yzr769m');
    formData.append('template_id', 'template_5itw1ce');
    formData.append('user_id', 'RTymPyyr-fp1fyDvR');

    const sendForm = async (formData) => {
        const maxRetries = 3;
        let retries = 0;
        let delay = 1000; // 1 second

        while (retries < maxRetries) {
            try {
                let response = await $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
                    type: 'POST',
                    data: formData,
                    contentType: false, // auto-detection
                    processData: false // no need to parse formData to string
                });

                alert('Your mail is sent!');
                localStorage.setItem('lastSent', now);
                return;

            } catch (error) {
                if (error.status === 429) { // Check for 429 status code
                    retries++;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    alert('Oops... ' + JSON.stringify(error));
                    return;
                }
            }
        }

        alert('Failed to send email after multiple attempts.');
    };

    sendForm(formData);
});
