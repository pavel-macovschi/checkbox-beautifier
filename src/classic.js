import Base from './base.js';

export default class Classic extends Base {

  static type = 'Classic';

  // Default options.
  _options = {
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
  };

  constructor(options) {
    super();
    this.setCustomOptions(options);
    this.inputElements = this.getInputs();

    if (this.getProperty('areGrouped')) {
      this.slaveInputElements = Array.from(this.inputElements).
          filter(el => el.classList.contains('checkbox-beautify--slave'));

      if (0 === this.slaveInputElements.length) {
        throw new Error(
            'To use a group of checkboxes you should indicate which checkboxes should be handled as slaves using [.checkbox-beautify--slave] class.');
      }
    }

    this.init();
  }

  init() {
    for (const input of this.inputElements) {
      this.hideVendorStyle(input);

      const
          outerPlaceholder = document.createElement('span'),
          innerPlaceholder = document.createElement('span'),
          borderRadius = parseInt(this.getProperty('borderRadius')) < 6 ?
              this.getProperty('borderRadius') :
              '6px',
          calcInnerPlaceholderHeight = parseInt(this.getProperty('size')) / 3;
      ;

      // Apply styles for outer placeholder element.
      outerPlaceholder.style.display = 'flex';
      outerPlaceholder.style.width = this.getProperty('size');
      outerPlaceholder.style.height = this.getProperty('size');
      outerPlaceholder.style.padding = this.getProperty('paddedSpace');
      outerPlaceholder.style.textAlign = 'center';
      outerPlaceholder.style.border = this.getProperty('border');
      outerPlaceholder.style.transition = this.getProperty('transition');
      outerPlaceholder.style.borderRadius = borderRadius;
      outerPlaceholder.style.boxShadow = this.getProperty('shadow');
      outerPlaceholder.style.margin = '0 0.4rem 0 0';
      outerPlaceholder.style.order = -1;
      outerPlaceholder.classList.add('checkbox-beautify-placeholder-outer');

      // Apply styles for inner placeholder element.
      innerPlaceholder.style.position = 'relative';
      innerPlaceholder.style.top = `${calcInnerPlaceholderHeight / 2}px`;
      innerPlaceholder.style.opacity = 0;
      innerPlaceholder.style.width = this.getProperty('size');
      innerPlaceholder.style.height = `${calcInnerPlaceholderHeight}px`;
      innerPlaceholder.style.border = this.getProperty('checkmark');
      // Hide top and right borders.
      innerPlaceholder.style.borderTop = 'none';
      innerPlaceholder.style.borderRight = 'none';
      innerPlaceholder.style.transform = 'rotate(-45deg)';
      innerPlaceholder.style.transition = this.getProperty('transition');
      innerPlaceholder.classList.add('checkbox-beautify-placeholder-inner');

      // Append a child placeholder element.
      outerPlaceholder.appendChild(innerPlaceholder);
      // Append a parent placeholder element.
      const parent = input.parentElement;
      parent.appendChild(outerPlaceholder);

      // Normalize line-height for label's children.
      const
          paddedSpace = parseInt(this.getProperty('paddedSpace')),
          size = parseInt(this.getProperty('size')),
          lineHeight = paddedSpace > 0 ? size + (paddedSpace * 2) : size;

      if ('LABEL' === parent.nodeName) {
        parent.style.lineHeight = `${lineHeight}px`;
      }

      // Assuming that a target input element isn't placed inside label.
      if ('LABEL' !== parent.nodeName) {
        const labelElement = document.querySelector(`[for="${input.id}"]`);
        labelElement.appendChild(outerPlaceholder);
        labelElement.prepend(input);
        // Normalize line height for labels to be used apart.
        labelElement.style.lineHeight = `${lineHeight}px`;

        Base.addLabelStyle(labelElement);
      }

      this.statePropertiesHandler(input, innerPlaceholder);

      // Add an event listener on a target input element.
      input.addEventListener('click', () => {
        input.toggleAttribute('checked');

        this.statePropertiesHandler(input, innerPlaceholder);
      }, false);

      // Remove dot prefix.
      const selector = this.getProperty('selector').substring(1);
      // Handle master/slave input checkboxes.
      if (input.classList.contains(`${selector}`) &&
          input.classList.contains(`checkbox-beautify--master`)) {
        input.addEventListener('click', e => this.handleMasterCheckbox(e));
      }
    }
  }

  handleMasterCheckbox(e) {
    for (const input of this.slaveInputElements) {
      // Set toggle handler on master checkbox itself.
      const checkmark = input.parentElement.querySelector(
          '.checkbox-beautify-placeholder-inner');
      // If a master checkbox is checked select all slave checkboxes.
      if (e.target.checked) {
        input.checked = true;
        checkmark.parentElement.style.backgroundColor = this.getProperty(
            'colorChecked');
        checkmark.style.opacity = 1;
      } else {
        input.checked = false;
        checkmark.parentElement.style.backgroundColor = this.getProperty(
            'colorUnchecked');
        checkmark.style.opacity = 0;
      }
    }
  }

  statePropertiesHandler(input, placeholder) {
    if (input.checked) {
      placeholder.parentElement.style.backgroundColor = this.getProperty(
          'colorChecked');
      placeholder.style.opacity = 1;
    } else {
      placeholder.parentElement.style.backgroundColor = this.getProperty(
          'colorUnchecked');
      placeholder.style.opacity = 0;
    }
  }

}