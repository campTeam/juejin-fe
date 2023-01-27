export const setThemeColor = (color: string) => {
  let el = document.querySelector('meta[name="theme-color"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', 'theme-color')
    document.head.appendChild(el)
  }
  el.setAttribute('content', color)
}
