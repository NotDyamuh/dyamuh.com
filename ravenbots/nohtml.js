const path = window.location.pathname;
if (path.endsWith('.html')) {
  const cleanPath = path.replace(/\.html$/, '');
  window.history.replaceState(null, '', cleanPath);
}

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
