export function getDirection(locale: string | undefined) {
  if (!locale) return 'ltr';
  const rtlLanguages = ['ar', 'fa'];
  return rtlLanguages.includes(locale) ? 'rtl' : 'ltr';
}
