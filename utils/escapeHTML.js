const escapeHTML = string => {
  // if string does not exist or typeof is not string
  if (!string || typeof string !== 'string') return undefined;

  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

module.exports = escapeHTML;
