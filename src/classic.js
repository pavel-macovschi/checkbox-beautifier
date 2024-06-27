import Base from './base.js';

export default class Classic extends Base {

  static type = 'Classic';

  constructor(options) {
    super({
      border: '1px solid black',
      checkmark: '2px solid black',
      colorChecked: 'rgb(238,255,239)',
      colorUnchecked: 'white',
      shadow: '0 0 4px rgba(0, 0, 0, 0.5)',
      borderRadius: '1px',
      size: '24px',
      paddedSpace: '4px',
      transition: 'all 0.4s',
      selector: '.checkbox-beautify-classic',
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
          borderRadius = parseInt(this.getOption('borderRadius')) < 6
              ? this.getOption('borderRadius')
              : '6px',
          calcInnerPlaceholderHeight = parseInt(this.getOption('size')) / 3
      ;

      // Apply styles for outer placeholder element.
      this.setStyles(placeholderOuter, {
        display: 'flex',
        width: this.getOption('size'),
        height: this.getOption('size'),
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
        position: 'relative',
        top: `${calcInnerPlaceholderHeight / 2}px`,
        opacity: 0,
        width: this.getOption('size'),
        height: `${calcInnerPlaceholderHeight}px`,
        border: this.getOption('checkmark'),
        // Hide top and right borders.
        borderTop: 'none',
        borderRight: 'none',
        transform: 'rotate(-45deg)',
        transition: this.getOption('transition'),
      });

      // Add class for correct selection in a master handler.
      placeholderInner.classList.add('checkbox-beautify-placeholder-inner');

      // Append a child placeholder element.
      placeholderOuter.appendChild(placeholderInner);

      // Append a parent placeholder element.
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
      const checkmark = input.parentElement.querySelector(
              '.checkbox-beautify-placeholder-inner'),
          parent = checkmark.parentElement
      ;
      // If a master checkbox is checked select all slave checkboxes.
      if (e.target.checked) {
        input.checked = true;
        parent.style.backgroundColor = this.getOption('colorChecked');
        checkmark.style.opacity = 1;
      } else {
        input.checked = false;
        parent.style.backgroundColor = this.getOption('colorUnchecked');
        checkmark.style.opacity = 0;
      }
    }
  }

  statePropertiesHandler(input, placeholder) {
    const parentPlaceholder = placeholder.parentElement;
    if (input.checked) {
      parentPlaceholder.style.backgroundColor = this.getOption('colorChecked');
      placeholder.style.opacity = 1;
    } else {
      parentPlaceholder.style.backgroundColor = this.getOption(
          'colorUnchecked');
      placeholder.style.opacity = 0;
    }
  }

}