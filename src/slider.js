import Base from './base.js';

export default class Slider extends Base {

  static type = 'Slider';

  constructor(options) {
    super({
      handleColorChecked: 'white',
      handleColorUnchecked: 'lightblue',
      boxColorChecked: 'lightblue',
      boxColorUnchecked: 'white',
      boxWidth: '80px',
      boxHeight: '30px',
      handleSize: '30px',
      boxBorder: '1px solid rgba(0,0,0,.3)',
      shadow: '0 0 4px lightgray',
      borderRadius: '20px',
      areGrouped: false,
      transition: 'all 0.4s',
      selector: '.checkbox-beautify-slider',
      labelSpace: '0.4rem',
    }, options);

    this.init();
  }

  init() {
    for (const input of this.inputElements) {
      this.hideVendorStyle(input);

      const
          boxElement = document.createElement('span'),
          handleElement = document.createElement('span'),
          boxHeight = parseInt(this.getOption('boxHeight')),
          handleSize = parseInt(this.getHandleSize()),
          handleCalcTopStyle = handleSize < boxHeight ?
              (boxHeight - handleSize) / 2 :
              0;

      boxElement.classList.add('checkbox-beautify-placeholder-box');

      // Apply styles for outer placeholder element.
      this.setStyles(boxElement, {
        display: 'block',
        position: 'relative',
        width: this.getOption('boxWidth'),
        height: this.getOption('boxHeight'),
        border: this.getOption('boxBorder'),
        borderRadius: this.getOption('borderRadius'),
        backgroundColor: this.getOption('boxColorUnchecked'),
        boxShadow: this.getOption('shadow'),
        transition: this.getOption('transition'),
        order: -1,
        marginRight: this.getOption('labelSpace'),
      });

      // Apply styles for inner placeholder element.
      this.setStyles(handleElement, {
        display: 'block',
        position: 'absolute',
        top: `${handleCalcTopStyle}px`,
        left: 0,
        width: this.getHandleSize(),
        height: this.getHandleSize(),
        backgroundColor: this.getOption('handleColorChecked'),
        borderRadius: this.getOption('borderRadius'),
        transition: this.getOption('transition'),
      });

      // Append a child placeholder element.
      boxElement.appendChild(handleElement);

      // Append a parent placeholder element.
      const parent = input.parentElement;
      parent.appendChild(boxElement);

      this.labelNormalizer(parent, input, boxElement);

      // Default state properties.
      this.statePropertiesHandler(input, handleElement, boxElement);

      // Add an event listener on a target input element.
      input.addEventListener('click', () => {
        // Set toggle handler.
        input.toggleAttribute('checked');
        this.statePropertiesHandler(input, handleElement, boxElement);
      }, false);

      // Handle master/slave input checkboxes.
      const selector = this.getOption('selector').substring(1);

      if (input.classList.contains(selector) &&
          input.classList.contains('checkbox-beautify--master')) {
        input.addEventListener('click', e => this.handleMasterCheckbox(e));
      }
    }
  }

  handleMasterCheckbox(e) {
    for (const input of this.slaveInputs) {
      const
          boxElement = input.parentElement.querySelector(
              '.checkbox-beautify-placeholder-box'),
          handleElement = boxElement.children.item(0);
      // If master checkbox is set mark slave checkboxes.
      this.statePropertiesHandler(e.target, handleElement, boxElement);
      // Set checked attribute on a slave input.
      e.target.checked ? input.checked = true : input.checked = false;
    }
  }

  statePropertiesHandler(input, handleElement, boxElement) {
    const left = (parseInt(this.getOption('boxWidth')) -
        parseInt(this.getHandleSize())) + 'px';

    if (input.checked) {
      boxElement.style.backgroundColor = this.getOption('boxColorChecked');
      handleElement.style.backgroundColor = this.getOption(
          'handleColorChecked');
      handleElement.style.left = left;
    } else {
      boxElement.style.backgroundColor = this.getOption('boxColorUnchecked');
      handleElement.style.backgroundColor = this.getOption(
          'handleColorUnchecked');
      handleElement.style.left = 0;
    }
  }

  getHandleSize() {
    // Do not allow to make a handle size bigger than a box height.
    const
        handleSize = this.getOption('handleSize'),
        boxHeight = this.getOption('boxHeight')
    ;

    return handleSize > boxHeight ? boxHeight : handleSize;
  }

  labelNormalizer(parent, input, boxElement) {
    // Set correct line height for label text.
    if ('LABEL' === parent.nodeName) {
      parent.style.lineHeight = this.getOption('boxHeight');
    }

    // Assuming that a target input element is not placed inside a label.
    if ('LABEL' !== parent.nodeName) {
      const labelElement = document.querySelector([`[for="${input.id}"]`]);

      if (!labelElement) {
        throw new Error(`
            Label element is not found for input with value: ${input.value},
            add [id] attribute for it and [for] attribute for a parent label.
          `);
      }

      labelElement.style.lineHeight = this.getOption('boxHeight');
      labelElement.appendChild(boxElement);
      labelElement.prepend(input);

      Base.addLabelStyle(labelElement);
    }
  }

}