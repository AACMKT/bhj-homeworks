class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.counterElement = container.querySelector('.status__counter');

    this.reset();
    this.counter();
    this.registerEvents();
  }

  counter() {
    setInterval(() => {this.counterElement.textContent = Number(this.counterElement.textContent) - 1; if (this.counterElement.textContent <= 0) this.fail()} ,1000)
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.counterElement.textContent = 12;
  }

  registerEvents() {
    let regular = new RegExp("Key.")
    document.addEventListener('keyup', e => {console.log(e.code); if ((regular.test(e.code)||['б', 'ю', 'х', 'ъ', 'ё'].includes(e.key.toLowerCase())) || (e.code == 'Space'))
      {this.currentSymbol.textContent.toLowerCase() == e.key.toLowerCase() && this.counterElement.textContent > 0 ? this.success() : this.fail()}});
  }
  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    this.counterElement.textContent = 10;
  }

  fail() {
    if (++this.lossElement.textContent === 5 || this.counterElement.textContent <= 0) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript',
        'привет',
        'фриDom',
        'русский english',
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

