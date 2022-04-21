const ls = window.localStorage;

document.getElementById('log-out-button').addEventListener('click', () => {
    ls.clear();
  });
  