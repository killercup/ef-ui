var options = {
  1: "Meh",
  2: "Hmm",
  3: "Yay"
};

module.exports = function (rating) {
  var text = options[rating];
  if (text) {
    return text;
  }

  throw new Error("Unknown rating `" + rating + "`");
};

module.exports.options = options;
