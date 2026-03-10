window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');

  if (!nav) {
    return;
  }

  nav.style.boxShadow =
    window.scrollY > 50 ? '0 6px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)';
});

function initLogoLoop() {
  const loop = document.querySelector('.logo-loop');

  if (!loop) {
    return;
  }

  const speed = Number(loop.dataset.speed ?? 120);
  const direction = loop.dataset.direction ?? 'left';
  const width = loop.dataset.width ?? '100%';
  const logoHeight = Number(loop.dataset.logoHeight ?? 28);
  const gap = Number(loop.dataset.gap ?? 32);
  const hoverSpeed = Number(loop.dataset.hoverSpeed ?? 0);
  const fadeOut = loop.dataset.fadeOut === 'true';
  const fadeOutColor = loop.dataset.fadeOutColor;
  const scaleOnHover = loop.dataset.scaleOnHover === 'true';
  const ariaLabel = loop.getAttribute('aria-label') || 'Partner logos';

  const items = [...loop.querySelectorAll('img')];
  const logos = items.map((img) => img.getAttribute('src')).filter(Boolean);

  if (logos.length === 0) {
    return;
  }

  loop.setAttribute('role', 'region');
  loop.setAttribute('aria-label', ariaLabel);
  loop.style.width = typeof width === 'number' ? `${width}px` : width;
  loop.style.setProperty('--logo-height', `${logoHeight}px`);
  loop.style.setProperty('--loop-gap', `${gap}px`);

  if (fadeOut) {
    loop.classList.add('logo-loop--fade');
    if (fadeOutColor) {
      loop.style.setProperty('--fade-color', fadeOutColor);
    }
  }

  if (scaleOnHover) {
    loop.classList.add('logo-loop--scale');
  }

  const rendered = items.map((img, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'logo-loop__item';
    wrapper.dataset.key = `${index}`;
    wrapper.appendChild(img.cloneNode(true));
    return wrapper;
  });

  const track = document.createElement('div');
  track.className = 'logo-loop__track';
  if (direction === 'right') {
    loop.dataset.direction = 'right';
  }

  rendered.forEach((node) => track.appendChild(node));
  rendered.forEach((node) => track.appendChild(node.cloneNode(true)));

  loop.innerHTML = '';
  loop.appendChild(track);

  requestAnimationFrame(() => {
    const distance = track.scrollWidth / 2;
    const absSpeed = Math.max(10, Math.abs(speed));
    const duration = distance / absSpeed;

    track.style.setProperty('--loop-distance', `${distance}px`);
    track.style.setProperty('--loop-duration', `${duration}s`);
  });

  if (hoverSpeed >= 0) {
    loop.addEventListener('mouseenter', () => {
      if (hoverSpeed === 0) {
        track.style.animationPlayState = 'paused';
        return;
      }

      const slowDuration = Math.max(1, (track.scrollWidth / 2) / hoverSpeed);
      track.style.setProperty('--loop-duration', `${slowDuration}s`);
    });

    loop.addEventListener('mouseleave', () => {
      const absSpeed = Math.max(10, Math.abs(speed));
      const normalDuration = (track.scrollWidth / 2) / absSpeed;
      track.style.setProperty('--loop-duration', `${normalDuration}s`);
      track.style.animationPlayState = 'running';
    });
  }
}

window.addEventListener('DOMContentLoaded', initLogoLoop);
