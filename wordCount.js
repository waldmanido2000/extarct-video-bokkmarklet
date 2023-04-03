javascript:(function() {
    function extractWords() {
      const bodyText = document.body.innerText;
      const words = bodyText
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .split(' ');
  
      const wordCounts = {};
  
      words.forEach((word) => {
        if (wordCounts[word]) {
          wordCounts[word]++;
        } else {
          wordCounts[word] = 1;
        }
      });
  
      return wordCounts;
    }
  
    const wordList = extractWords();
    console.table(wordList);
  })();
  