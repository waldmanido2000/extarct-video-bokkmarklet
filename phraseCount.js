javascript:(function() {
    function extractWords() {
      const bodyText = document.body.innerText;
      const words = bodyText
        .replace(/[^\u0590-\u05FF\w\s]|_/g, '')
        .replace(/\s+/g, ' ')
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
  
    function sortWordCounts(wordCounts) {
      return Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
    }
  
    function exportToCSV(sortedWordList, numWords) {
      const currentDate = new Date().toLocaleString();
      const pageURL = document.URL;
      const header = `Date and Time: ${currentDate}\nWebpage URL: ${pageURL}\n\nWord,Count\n`;
      const bom = '\ufeff';
      const topWords = sortedWordList.slice(0, numWords);
      const csvContent = 'data:text/csv;charset=utf-8,' + bom + header + topWords.map(([word, count]) => `${word},${count}`).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'word_counts.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    const wordList = extractWords();
    const sortedWordList = sortWordCounts(wordList);
    const numWords = parseInt(prompt('Enter the number of words to export:', '20'));
    if (!isNaN(numWords) && numWords > 0) {
      exportToCSV(sortedWordList, numWords);
    } else {
      alert('Invalid input. Please enter a positive number.');
    }
  })();
  