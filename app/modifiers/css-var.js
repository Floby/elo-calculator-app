import { modifier } from 'ember-modifier'

export default modifier(function cssVar(element, positional, vars) {
  let cssVars = {...vars}
  for (let pos of positional) {
    if (typeof pos === 'object') {
      cssVars = { ...pos, ...cssVars}
    }
  }
  const style = element.style
  for (const [k, v] of Object.entries(cssVars)) {
    style.setProperty(`--${k}`, v)
  }
})
