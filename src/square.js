import Base from './base.js';

export default class Square extends Base {

  static type = 'Square';

  constructor(options) {
    super({
      border: '1px solid black',
      colorChecked: 'black',
      colorUnchecked: 'rgba(0, 0, 0, 0.1)',
      shadow: '0 0 4px rgba(0, 0, 0, 0.5)',
      borderRadius: '1px',
      size: '24px',
      paddedSpace: '4px',
      transition: 'all 0.4s',
      selector: '.checkbox-beautify-square',
      areGrouped: false,
      labelSpace: '0.4rem',
    }, options);

    this.init();
  }

  init() {
    for (const input of this.inputElements) {
      this.hideVendorStyle(input);

      const
          placeholderOuter = document.createElement('span'),
          placeholderInner = document.createElement('span'),
          borderRadius = parseInt(this.getOption('borderRadius')) < 6 ?
              this.getOption('borderRadius') : '6px';

      // Apply styles for outer placeholder element.
      this.setStyles(placeholderOuter, {
        display: 'flex',
        padding: this.getOption('paddedSpace'),
        textAlign: 'center',
        border: this.getOption('border'),
        transition: this.getOption('transition'),
        borderRadius: borderRadius,
        boxShadow: this.getOption('shadow'),
        marginRight: this.getOption('labelSpace'),
        order: -1,
      });

      // Apply styles for inner placeholder element.
      this.setStyles(placeholderInner, {
        display: 'inline-block',
        width: this.getOption('size'),
        height: this.getOption('size'),
        transition: this.getOption('transition'),
        borderRadius: borderRadius,
      });

      // Add class for correct selection in a master handler.
      placeholderInner.classList.add('checkbox-beautify-placeholder-inner');

      // Append a child placeholder.
      placeholderOuter.appendChild(placeholderInner);

      // Append an outer placeholder to a parent element.
      const parent = input.parentElement;
      parent.appendChild(placeholderOuter);

      this.lineHeightNormalizer(parent, input, placeholderOuter);

      this.statePropertiesHandler(input, placeholderInner);

      // Add an event listener on a target input element.
      input.addEventListener('click', () => {
        input.toggleAttribute('checked');

        this.statePropertiesHandler(input, placeholderInner);
      });

      // Remove dot prefix.
      const selector = this.getOption('selector').substring(1);

      // Handle master/slave input checkboxes.
      if (input.classList.contains(`${selector}`) &&
          input.classList.contains(`checkbox-beautify--master`)) {
        input.addEventListener('click', e => this.handleMasterCheckbox(e));
      }
    }
  }

  handleMasterCheckbox(e) {
    for (const input of this.slaveInputs) {

      // Set toggle handler on master checkbox itself.
      const placeholder = input.parentElement.querySelector(
          '.checkbox-beautify-placeholder-inner');
      // If a master checkbox is checked select all slave checkboxes.
      if (e.target.checked) {
        input.checked = true;
        placeholder.style.backgroundColor = this.getOption('colorChecked');
      } else {
        input.checked = false;
        placeholder.style.backgroundColor = this.getOption('colorUnchecked');
      }
    }
  }

  statePropertiesHandler(input, placeholder) {
    if (input.checked) {
      placeholder.style.backgroundColor = this.getOption('colorChecked');
    } else {
      placeholder.style.backgroundColor = this.getOption('colorUnchecked');
    }
  }
}