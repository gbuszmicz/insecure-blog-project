// Check if @str starts with char/s @starts
// Used to check tags and users in search
exports.startsWith = function(str, starts) {
  if (starts === '') return true;
  if (str == null || starts == null) return false;
  str = String(str); starts = String(starts);
  return str.length >= starts.length && str.slice(0, starts.length) === starts;
};
