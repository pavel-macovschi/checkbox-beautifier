export default class Base {

  /**
   * Set custom options.
   */
  setCustomOptions (options) {
    for (const key in options) {
      if (this._options.hasOwnProperty(key)) {
        this._options[key] = options[key]
      }
    }
  }

  /**
   * Returns formatted object options.
   */
  getOptions () {
    return Object
      .keys(this._options)
      .toString()
      .split(',')
      .join(' | ')
  }

  /**
   * Returns a property associated with an object.
   */
  getProperty (key) {
    if (typeof this._options[key] === 'undefined') {
      throw new Error(`Cannot find an option [${key}], use one of these: ${this.getOptions()}`)
    }

    return this._options[key]
  }

  /**
   * Returns input elements by selector.
   */
  getInputs () {
    const
      areGrouped = this.getProperty('areGrouped'),
      selector = this.getProperty('selector'),
      nodes = areGrouped
        ? Array.from(document.querySelectorAll(`${selector}.checkbox-beautify--master`)).concat(Array.from(document.querySelectorAll(`${selector}.checkbox-beautify--slave`)))
        : Array.from(document.querySelectorAll(`${selector}`)).filter(n => (!n.classList.contains('checkbox-beautify--master') && !n.classList.contains('checkbox-beautify--slave')))

    if (0 === nodes.length) {
      throw new Error(`Cannot find checkboxes by provided selector ${selector}`)
    }

    return nodes
  }

  /**
   * Reset vendor's style.
   */
  hideVendorStyle (input) {
    const parent = input.parentElement

    if ('LABEL' === parent.nodeName) {
      Base.addLabelStyle(parent)
    }

    input.style.appearance = 'none'
    input.style.display = 'none'
    input.style.opacity = 0
    input.style.margin = 0
    input.style.padding = 0
  }

  static addLabelStyle (element) {
    element.style.display = 'inline-flex'
    element.style.cursor = 'pointer'
    element.style.userSelect = 'none'
  }
}