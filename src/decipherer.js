module.exports = {
  decodePhrase (phrase, displacement) {
    const encrypted = phrase.split('');

    let output = '';
    encrypted.forEach(element => {
      let code = element.charCodeAt(0);
      
      let startingPosition = null;
      if (code >= 65 && code <= 90) {
        startingPosition = 65;
      } else if (code >= 97 && code <= 122) {
        startingPosition = 97;
      }

      let result = code;
      if (startingPosition != null) {
        result = (code - startingPosition - displacement) % 26;
        result = (result < 0) ? 26 + result : result;
        result += startingPosition;
      }

      output += String.fromCharCode(result);
    });

    return output.toLowerCase();
  }
};