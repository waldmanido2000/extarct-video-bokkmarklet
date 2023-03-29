javascript:(function() {
  var videoElements = document.querySelectorAll('video');
  if (videoElements.length > 0) {
    videoElements.forEach(function(videoElement, index) {
      var videoURL = videoElement.src;
      var originalFilename = videoElement.getAttribute('data-filename') || 'video_' + (index + 1) + '.mp4';
      var link = document.createElement('a');
      link.href = videoURL;
      link.download = originalFilename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  } else {
    alert('No videos found on the page.');
  }
})();
