export class CardService {
  static validWithLuhnAlgorithm(cardNumber: string) {
    const reversedNumbers = cardNumber.split('').reverse().join('');

    let sum = 0;
    for (let i = 0; i < reversedNumbers.length; i++) {
      let digit = parseInt(reversedNumbers[i], 10);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }
}
