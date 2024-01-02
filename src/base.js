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
   * Returns formatted object keys.
   */
  getFormattedObjectKeys () {
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
      throw new Error(`Cannot find an option [${key}], use one of these: ${this.getFormattedObjectKeys()}`)
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
}