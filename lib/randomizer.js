function randomizer() {
  let randomString = '';
  let possible = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let stringLength = 6;

  function pickRandom() {
      return possible[Math.floor(Math.random() * possible.length)];
  }

  return randomString = Array.apply(null, Array(stringLength)).map(pickRandom).join('');
}

module.exports = randomizer;
