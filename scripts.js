document.addEventListener('DOMContentLoaded', () => {
  const nightLight = document.getElementById('nightlight');
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
    nightLight.classList.remove('hide');
  }

  document.addEventListener('click', (e) => {
    if (e.target.id === 'pullchain') {
      document.body.classList.toggle('dark');
      nightLight.classList.toggle('hide');
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
        e.target.textContent = '⏸';
      } else {
        audioControls.pause();
        e.target.textContent = e.target.getAttribute('data-track-number');
      }
      
      audioButtons.forEach(btn => {
        if (btn !== e.target) {
            btn.textContent = btn.getAttribute('data-track-number');
        }
      });
    });
  });

  audioControls.addEventListener('ended', function () {
    audioButtons.forEach(button => {
      button.textContent = button.getAttribute('data-track-number');
    });
  });
});