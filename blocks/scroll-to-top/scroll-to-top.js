// we need to setInterval otherwise scrollTopBtn is initially null
const interval = setInterval(() => {
  const scrollTopBtn = document.querySelector('[data-block-name="scroll-to-top"]');

  if (scrollTopBtn) {
    scrollTopAdd();
    clearInterval(interval);
  }
}, 1000);

const scrollTopAdd = () => {
  const isDesktop = window.matchMedia('(min-width: 640px)');
  const scrollTopBtn = document.querySelector('[data-block-name="scroll-to-top"]');

  if (isDesktop.matches && scrollTopBtn) {

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    });

    window.addEventListener('scroll', function() {
      if (window.scrollY > 600) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

  }
}
