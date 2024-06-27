export default class Base {

  constructor(defaultOptions, customOptions) {
    this._options.setOptions(defaultOptions, customOptions);
    this.inputElements = this.getInputs();

    if (this.getOption('areGrouped')) {
      this.slaveInputs = Array.from(this.inputElements).
          filter(el => el.classList.contains('checkbox-beautify--slave'))
      ;
      // Get a master checkbox.
      const masterCheckbox = this.inputElements.filter(
          el => el.classList.contains('checkbox-beautify--master'))[0];
      // Check if master input is checked.
      if (masterCheckbox.checked) {
        // If a master input is checked set all slave inputs as checked.
        this.slaveInputs.map(el => el.checked = true);
      }

      if (0 === this.slaveInputs.length) {
        throw new Error(`
        There are no slave inputs found!
        To use a group of checkboxes you need to identify which checkboxes should be handled as slaves using [.checkbox-beautify--slave] class.`);
      }
    }
  }

  _options = (function() {
    let defaultOptions;

    return {
      setOptions(options, customOptions) {
        defaultOptions = options;
        // Overwrite default options.
        for (const key in customOptions) {
          if (defaultOptions.hasOwnProperty(key)) {
            defaultOptions[key] = customOptions[key];
          }
        }
      },
      getOptionValue(key) {
        if (typeof defaultOptions[key] === 'undefined') {
          throw new Error(
              `Cannot find an option [${key}], use one of these: ${this.getOptions()}`);
        }

        return defaultOptions[key];
      },
      getOptions() {
        return Object.keys(defaultOptions).toString().split(',').join(' | ');
      },
    };
  })();

  /**
   * Returns formatted object options.
   */
  getOptions() {
    return this._options.getOptions();
  }

  /**
   * Returns a property associated with an object.
   */
  getOption(key) {
    return this._options.getOptionValue(key);
  }

  /**
   * Returns input elements by selector.
   */
  getInputs() {
    const
        areGrouped = this.getOption('areGrouped'),
        selector = this.getOption('selector'),
        nodes = areGrouped
            ?
            Array.from(document.querySelectorAll(
                `${selector}.checkbox-beautify--master`)).
                concat(Array.from(document.querySelectorAll(
                    `${selector}.checkbox-beautify--slave`)))
            :
            Array.from(document.querySelectorAll(`${selector}`)).
                filter(
                    n => (!n.classList.contains('checkbox-beautify--master') &&
                        !n.classList.contains('checkbox-beautify--slave')));

    if (0 === nodes.length) {
      throw new Error(
          `Cannot find checkboxes by provided selector: ${selector}`);
    }

    return nodes;
  }

  /**
   * Apply styles to a html element.
   */
  setStyles(element, styles = {}) {
    Object.assign(element.style, styles);
  }

  /**
   * Hide vendor's style.
   */
  hideVendorStyle(input) {
    const parent = input.parentElement;

    if ('LABEL' === parent.nodeName) {
      Base.addLabelStyle(parent);
    }

    this.setStyles(input, {
      appearance: 'none',
      display: 'none',
      opacity: 0,
      margin: 0,
      padding: 0,
    });
  }

  static addLabelStyle(element) {
    element.style.display = 'inline-flex';
    element.style.cursor = 'pointer';
    element.style.userSelect = 'none';
  }

  lineHeightNormalizer(parent, input, placeholderOuter) {
    // Normalize line-height for label's children.
    const
        paddedSpace = parseInt(this.getOption('paddedSpace')),
        size = parseInt(this.getOption('size')),
        lineHeight = paddedSpace > 0 ? size + (paddedSpace * 2) : size;

    if ('LABEL' === parent.nodeName) {
      parent.style.lineHeight = `${lineHeight}px`;
    }

    // Assuming that a target input element isn't placed inside label.
    if ('LABEL' !== parent.nodeName) {
      const labelElement = document.querySelector(`[for="${input.id}"]`);

      if (!labelElement) {
        throw new Error(`
            Label element is not found for input with value: ${input.value},
            add [id] attribute for it and [for] attribute for a parent label.
          `);
      }

      labelElement.appendChild(placeholderOuter);
      labelElement.prepend(input);

      // Normalize line height for labels to be used apart.
      labelElement.style.lineHeight = `${lineHeight}px`;

      // Add default label style.
      Base.addLabelStyle(labelElement);
    }
  }
}