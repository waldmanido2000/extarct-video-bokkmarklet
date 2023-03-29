javascript:(function() {
  var videoElement = document.querySelector('video');
  if (videoElement) {
    var videoURL = videoElement.src;
    var originalFilename = videoElement.getAttribute('data-filename') || 'video.mp4';
    var link = document.createElement('a');
    link.href = videoURL;
    link.download = originalFilename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('No video found on the page.');
  }
})();
