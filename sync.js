// sync.js

var analogKnob = document.getElementById('analog-knob');
var delay = 0;
var timing = 'delay';

analogKnob.addEventListener('mousedown', function(event) {
  event.preventDefault();
  document.addEventListener('mousemove', moveKnob);
  document.addEventListener('mouseup', releaseKnob);
});

function moveKnob(event) {
  var barWidth = document.getElementById('analog-bar').offsetWidth;
  var knobWidth = analogKnob.offsetWidth;
  var offsetX = event.clientX - knobWidth / 2;
  var minOffsetX = -knobWidth / 2;
  var maxOffsetX = barWidth - knobWidth / 2;

  offsetX = Math.max(minOffsetX, Math.min(offsetX, maxOffsetX));
  analogKnob.style.left = offsetX + 'px';

  var knobPosition = (offsetX - minOffsetX) / (maxOffsetX - minOffsetX);
  delay = Math.round(Math.pow(10, knobPosition * Math.log10(30000)) - 1);
  updateDelayLabel();
}

function releaseKnob() {
  document.removeEventListener('mousemove', moveKnob);
  document.removeEventListener('mouseup', releaseKnob);
}

function updateDelayLabel() {
  var delayLabel = document.getElementById('delay-label');
  delayLabel.textContent = 'Delay: ' + delay + ' ms';
}

function applyTiming() {
    timing = document.querySelector('input[name="timing"]:checked').value;
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var subtitles = e.target.result;
        var adjustedSubtitles = timing === 'delay' ? applyDelay(subtitles, delay) : applyHasten(subtitles, delay);
        
        var originalFilename = file.name;
        var adjustedFilename = 'synced_' + originalFilename;
        downloadFile(adjustedSubtitles, adjustedFilename);
      };
      reader.readAsText(file);
    }
  }
  
function applyDelay(subtitles, delay) {
    var lines = subtitles.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.includes('-->')) {
        var parts = line.split(' --> ');
        var startTime = parseTime(parts[0]);
        var endTime = parseTime(parts[1]);
        startTime += parseInt(delay);
        endTime += parseInt(delay);
        lines[i] = formatTime(startTime) + ' --> ' + formatTime(endTime);
      }
    }
    return lines.join('\n');
  }
  
  function applyHasten(subtitles, delay) {
    var lines = subtitles.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.includes('-->')) {
        var parts = line.split(' --> ');
        var startTime = parseTime(parts[0]);
        var endTime = parseTime(parts[1]);
        startTime -= parseInt(delay);
        endTime -= parseInt(delay);
        lines[i] = formatTime(startTime) + ' --> ' + formatTime(endTime);
      }
    }
    return lines.join('\n');
  }
  
  function parseTime(time) {
    var parts = time.split(':');
    var seconds = parseFloat(parts[2].replace(',', '.'));
    return (parseInt(parts[0]) * 3600000) + (parseInt(parts[1]) * 60000) + (seconds * 1000);
  }
  
  function formatTime(time) {
    var milliseconds = time % 1000;
    time = Math.floor(time / 1000);
    var seconds = time % 60;
    time = Math.floor(time / 60);
    var minutes = time % 60;
    time = Math.floor(time / 60);
    var hours = time;
    return (
      hours.toString().padStart(2, '0') + ':' +
      minutes.toString().padStart(2, '0') + ':' +
      seconds.toString().padStart(2, '0') + ',' +
      milliseconds.toString().padStart(3, '0')
    );
  }
  
  function downloadFile(content, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  