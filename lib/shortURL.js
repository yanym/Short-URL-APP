const md5 = require('md5');


function shortURL(url) {
  let ret = '';
  let stringLength = 6;

  let md5 = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // let md5 = md5(url)

  for (let i = 0; i < stringLength; i++) {
  	let rand = Math.random() * 62;
  	let temp = md5.charAt(rand)
  	//console.log(rand % 2);
  	// if (rand % 2 > 1.0) {
  	// 	ret += temp.toUpperCase();
  	// } else {
  		ret += temp;
  	// }
  }

  return ret;
}

module.exports = shortURL;
