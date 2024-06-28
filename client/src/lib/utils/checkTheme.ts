export function checkDefaultTheme() {
  const isDarkTheme = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark', isDarkTheme);

  return isDarkTheme;
}
