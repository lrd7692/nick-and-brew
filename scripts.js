document.addEventListener('DOMContentLoaded', () => {
  const mode = localStorage.getItem('mode');
  
  if (mode !== null) {
    if (mode === 'dark') {
      document.body.classList.add('dark');
    } else if (mode === 'light') {
      document.body.classList.remove('dark');
    }
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
  }

  document.addEventListener('click', (e) => {
    if (e.target.id === 'pullchain') {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    }
  });
  
  const audioControls = document.getElementById('audiocontrols');
  const audioSource = document.getElementById('audiosource');
  const audioButtons = document.querySelectorAll('.audiobutton');

  audioButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const track = e.target.parentElement;
      const trackSrc = track.getAttribute('data-src');

      if (audioSource.src !== trackSrc) {
        audioSource.src = trackSrc;
        audioControls.load();
      }

      if (audioControls.paused) {
        audioControls.play();
        e.target.textContent = '||';
      } else {
        audioControls.pause();
        e.target.textContent = e.target.getAttribute('data-track');
      }
      
      audioButtons.forEach(button => {
        if (button !== e.target) {
            button.textContent = button.getAttribute('data-track');
        }
      });
    });
  });

  audioControls.addEventListener('ended', () => {
    audioButtons.forEach(button => {
      button.textContent = button.getAttribute('data-track');
    });
  });
  
  document.addEventListener('input', (e) => {
    if (e.target.matches('textarea')) {
      e.target.style.height = '';
      e.target.style.paddingBottom = '0';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  });
});