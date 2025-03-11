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
  
  const audioPlayer = document.getElementById('audioplayer');
  const audioSource = document.getElementById('audiosource');
  const audioButtons = document.querySelectorAll('.audiobutton');

  audioButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const track = e.target.parentElement;
      const trackSrc = track.getAttribute('data-src');

      if (audioSource.src !== trackSrc) {
        audioSource.src = trackSrc;
        audioPlayer.load();
      }

      if (audioPlayer.paused) {
        audioPlayer.play();
        e.target.textContent = '⏸';
      } else {
        audioPlayer.pause();
        e.target.textContent = e.target.getAttribute('data-track-number');
      }
      
      playButtons.forEach(btn => {
        if (btn !== e.target) {
            btn.textContent = btn.getAttribute('data-track-number');
        }
      });
    });
  });

  audioPlayer.addEventListener('ended', function () {
    playButtons.forEach(button => {
      button.textContent = button.getAttribute('data-track-number');
    });
  });
});