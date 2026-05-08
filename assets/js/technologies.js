document.addEventListener('DOMContentLoaded', () => {
    // Lifecycle Stepper Logic
    function updateStepper(stepIndex) {
        const dots = document.querySelectorAll('.stepper-dot');
        const cards = document.querySelectorAll('.stepper-card-item');
        const fill = document.querySelector('.stepper-progress-fill');
        
        if (!dots.length || !fill) return;

        const progressWidth = ((stepIndex - 1) / (dots.length - 1)) * 100;
        fill.style.width = progressWidth + '%';

        dots.forEach((dot, index) => {
            if (index + 1 <= stepIndex) {
                dot.classList.add('active');
                dot.innerHTML = (index + 1 < stepIndex || (stepIndex === dots.length && index + 1 === dots.length)) 
                    ? '<i class="fas fa-check"></i>' 
                    : (index + 1).toString().padStart(2, '0');
            } else {
                dot.classList.remove('active');
                dot.innerHTML = (index + 1).toString().padStart(2, '0');
            }
        });

        cards.forEach((card, index) => {
            card.classList.toggle('active', index + 1 === stepIndex);
        });
    }

    const stepperCards = document.querySelectorAll('.stepper-card-item');
    if (stepperCards.length) {
        stepperCards.forEach((card, index) => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => updateStepper(index + 1));
        });
        updateStepper(1);
    }

    // Set Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
