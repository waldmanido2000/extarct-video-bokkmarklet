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
  
    function exportToCSV(wordList) {
      const currentDate = new Date().toLocaleString();
      const pageURL = document.URL;
      const header = `Date and Time: ${currentDate}\nWebpage URL: ${pageURL}\n\nWord,Count\n`;
      const bom = '\ufeff';
      const csvContent = 'data:text/csv;charset=utf-8,' + bom + header + Object.entries(wordList).map(([word, count]) => `${word},${count}`).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'word_counts.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    const wordList = extractWords();
    exportToCSV(wordList);
  })();
  