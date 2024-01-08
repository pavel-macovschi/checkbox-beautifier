import Base from './base.js'

export default class Slider extends Base {

  static type = 'Slider'

  _options = {
    handleColorChecked: 'white',
    handleColorUnchecked: 'lightblue',
    boxColorChecked: 'lightblue',
    boxColorUnchecked: 'white',
    boxWidth: '80px',
    boxHeight: '30px',
    boxBorder: '1px solid rgba(0,0,0,.3)',
    handleSize: '30px',
    shadow: '0 0 4px lightgray',
    borderRadius: '20px',
    areGrouped: false,
    transition: 'all 0.4s',
    selector: '.checkbox-beautify-slider'
  }

  constructor (options) {
    super()
    this.setCustomOptions(options)
    this.inputElements = this.getInputs()

    if (this.getProperty('areGrouped')) {
      this.slaveInputElements = Array.from(this.inputElements).filter(el => el.classList.contains('checkbox-beautify--slave'))

      if (0 === this.slaveInputElements.length) {
        throw new Error(
          'Using group of checkboxes you should indicate which checkboxes should be handled as slaves using [.checkbox-beautify--slave] class.'
        )
      }
    }

    this.init()
  }

  init () {
    for (const input of this.inputElements) {
      this.hideVendorStyle(input)

      const
        boxElement = document.createElement('span'),
        handleElement = document.createElement('span'),
        boxHeight = parseInt(this.getProperty('boxHeight')),
        handleSize = parseInt(this.getHandleSize()), 
        handleElementStyleTop = handleSize < boxHeight ? (boxHeight - handleSize) / 2 : 0
      
      // Apply styles for outer placeholder element.
      boxElement.style.display = 'block'
      boxElement.style.position = 'relative'
      boxElement.style.width = this.getProperty('boxWidth')
      boxElement.style.height = this.getProperty('boxHeight')
      boxElement.style.border = this.getProperty('boxBorder')
      boxElement.style.borderRadius = this.getProperty('borderRadius')
      boxElement.style.backgroundColor = this.getProperty('boxColorUnchecked')
      boxElement.style.boxShadow = this.getProperty('shadow')
      boxElement.style.transition = this.getProperty('transition')
      boxElement.style.order = -1
      boxElement.style.marginRight = '6px'
      boxElement.classList.add('checkbox-beautify-placeholder-box')

      // Apply styles for inner placeholder element.
      handleElement.style.display = 'block'
      handleElement.style.position = 'absolute'
      handleElement.style.top = `${handleElementStyleTop}px`
      handleElement.style.left = 0
      handleElement.style.width = this.getHandleSize()
      handleElement.style.height = this.getHandleSize()
      handleElement.style.backgroundColor = this.getProperty('handleColorChecked')
      handleElement.style.borderRadius = this.getProperty('borderRadius')
      handleElement.style.transition = this.getProperty('transition')

      // Append a child placeholder element.
      boxElement.appendChild(handleElement)
      // Append a parent placeholder element.
      const parent = input.parentElement
      parent.appendChild(boxElement)

      // Set correct line height for label text.
      if ('LABEL' === parent.nodeName) {
        parent.style.lineHeight = this.getProperty('boxHeight')
      }

      // Assuming that a target input element is not placed inside a label.
      if ('LABEL' !== parent.nodeName) {
        const labelElement = document.querySelector([`[for="${input.id}"]`])
        labelElement.style.lineHeight = this.getProperty('boxHeight')
        labelElement.appendChild(boxElement)
        labelElement.prepend(input)

        Base.addLabelStyle(labelElement)
      }

      // Default state properties.
      this.statePropertiesHandler(input, handleElement, boxElement)

      // Add an event listener on a target input element.
      input.addEventListener('click', () => {
        // Set toggle handler.
        input.toggleAttribute('checked')
        this.statePropertiesHandler(input, handleElement, boxElement)
      }, false)

      // Handle master/slave input checkboxes.
      const selector = this.getProperty('selector').substr(1)

      if (input.classList.contains(selector) && input.classList.contains('checkbox-beautify--master')) {
        input.addEventListener('click', (e) => this.handleMasterCheckbox(e))
      }
    }
  }

  handleMasterCheckbox (e) {
    for (const input of this.slaveInputElements) {
      const
        boxElement = input.parentElement.querySelector('.checkbox-beautify-placeholder-box'),
        handleElement = boxElement.children.item(0)
      // If master checkbox is set mark slave checkboxes.
      this.statePropertiesHandler(e.target, handleElement, boxElement)
      // Set checked attribute on a slave input.
      e.target.checked ? input.checked = true : input.checked = false
    }
  }

  statePropertiesHandler (inputElement, handleElement, boxElement) {
    const left = (parseInt(this.getProperty('boxWidth')) - parseInt(this.getHandleSize())) + 'px'

    if (inputElement.checked) {
      boxElement.style.backgroundColor = this.getProperty('boxColorChecked')
      handleElement.style.backgroundColor = this.getProperty('handleColorChecked')
      handleElement.style.left = left
    } else {
      boxElement.style.backgroundColor = this.getProperty('boxColorUnchecked')
      handleElement.style.backgroundColor = this.getProperty('handleColorUnchecked')
      handleElement.style.left = 0
    }
  }

  getHandleSize () {
    // Do not allow to make a handle size bigger than a box height.
    return this.getProperty('handleSize') > this.getProperty('boxHeight') ? this.getProperty('boxHeight') : this.getProperty('handleSize')
  }

}