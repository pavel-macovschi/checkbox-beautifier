export default class Square {
    /**
     *
     * @type {string}
     */
    static type = 'Square';

    /**
     *
     * @type {{border: string, areGrouped: boolean, shadow: string, borderRadius: string, size: string, paddedSpace: string, colorChecked: string, colorUnchecked: string, selector: string, transition: string}}
     * @private
     */
    _defaultProperties = {
        border: '1px solid black',
        colorChecked: 'black',
        colorUnchecked: 'rgba(0, 0, 0, 0.2)',
        shadow: '0 0 4px rgba(0, 0, 0, 0.5)',
        borderRadius: '1px',
        size: '24px',
        paddedSpace: '4px',
        transition: 'all ease-out 0.2s',
        selector: '.checkbox-beautify-square',
        areGrouped: false
    };

    /**
     *
     * @param props
     */
    constructor(props) {
        this.setCustomProperties(props);
        this.inputElements = this.getInputElements();
        this.init();
    }

    /**
     * Set custom properties.
     *
     * @param props
     */
    setCustomProperties(props) {
        for (const key in props) {
            if (this._defaultProperties.hasOwnProperty(key)) {
                this._defaultProperties[key] = props[key];
            }
        }
    }

    /**
     * Returns formatted object keys.
     *
     *
     * @returns {string}
     */
    getFormattedObjectKeys() {
        return Object
            .keys(this._defaultProperties)
            .toString()
            .split(',')
            .join(' | ')
        ;
    }

    /**
     * Returns a property associated with an object.
     *
     * @param prop
     * @returns {*}
     */
    getProperty(prop) {
        if (typeof this._defaultProperties[prop] === 'undefined') {
            throw new Error(`Cannot find a property [${prop}], use on of these: ${this.getFormattedObjectKeys()}`);
        }
        return this._defaultProperties[prop];
    }

    /**
     * Returns input elements by selector.
     *
     */
    getInputElements() {
        const
            areGrouped = this.getProperty('areGrouped'),
            selector = this.getProperty('selector'),
            nodes = areGrouped
                ? Array.from(document.querySelectorAll(`${selector}.checkbox-beautify--master`)).concat(Array.from(document.querySelectorAll(`${selector}.checkbox-beautify--slave`)))
                : Array.from(document.querySelectorAll(`${selector}`)).filter(n => (!n.classList.contains('checkbox-beautify--master') && !n.classList.contains('checkbox-beautify--slave')))
        ;

        if (0 === nodes.length) {
            throw new Error(`Cannot find checkbox elements by selector ${selector}`);
        }

        return nodes;
    }

    /**
     * Hide default input styles.
     */
    hideDefaultStyle() {
        for (const input of this.inputElements) {
            // Add some style properties.
            const parent = input.parentElement;

            if ('LABEL' === parent.nodeName) {
                Square.addLabelStyle(parent);
            }

            // Remove default style.
            input.style.appearance = 'none';
            input.style.margin = 0;
            input.style.padding = 0;
        }
    }

    init() {
        this.hideDefaultStyle();

        for (const input of this.inputElements) {
            const
                outerPlaceholderElement = document.createElement('span'),
                innerPlaceholderElement = document.createElement('span'),
                borderRadius = parseInt(this.getProperty('borderRadius')) < 6 ? this.getProperty('borderRadius') : '6px'
            ;

            // Apply styles for outer placeholder element.
            outerPlaceholderElement.style.display = 'flex';
            outerPlaceholderElement.style.position = 'relative';
            outerPlaceholderElement.style.padding = `${this.getProperty('paddedSpace')}`;
            outerPlaceholderElement.style.textAlign = 'center';
            outerPlaceholderElement.style.border = `${this.getProperty('border')}`;
            outerPlaceholderElement.style.transition = `${this.getProperty('transition')}`;
            outerPlaceholderElement.style.borderRadius = `${borderRadius}`;
            outerPlaceholderElement.style.boxShadow = `${this.getProperty('shadow')}`;
            outerPlaceholderElement.style.margin = '0 0.3rem 0 0';
            outerPlaceholderElement.style.order = -1;

            // Apply styles for inner placeholder element.
            innerPlaceholderElement.style.display = 'flex';
            innerPlaceholderElement.style.position = 'relative';
            innerPlaceholderElement.style.transition = `${this.getProperty('transition')}`;
            innerPlaceholderElement.style.borderRadius = `${borderRadius}`;
            innerPlaceholderElement.style.width = `${this.getProperty('size')}`;
            innerPlaceholderElement.style.height = `${this.getProperty('size')}`;

            // Append a child placeholder element.
            outerPlaceholderElement.appendChild(innerPlaceholderElement);
            // Append a parent placeholder element.
            const parent = input.parentElement;
            parent.appendChild(outerPlaceholderElement);

            // Normalize line-height for label's children.
            const
                paddedSpace = parseInt(this.getProperty('paddedSpace')),
                size = parseInt(this.getProperty('size')),
                calculateLineHeight = paddedSpace > 0 ? size + (paddedSpace * 2) : size
            ;

            if ('LABEL' === parent.nodeName) {
                parent.style.lineHeight = `${calculateLineHeight}px`;
            }

            // Assuming that a target input element isn't placed inside label.
            if ('LABEL' !== parent.nodeName) {
                const labelElement = document.querySelector([`[for="${input.id}"]`]);
                labelElement.appendChild(outerPlaceholderElement);
                labelElement.prepend(input);
                // Normalize line height for labels to be used apart.
                labelElement.style.lineHeight = `${calculateLineHeight}px`;

                Square.addLabelStyle(labelElement);
            }


            // Set a default color that depends on initial state.
            this.statePropertiesHandler(input, innerPlaceholderElement);

            // Add an event listener on a target input element.
            input.addEventListener('click', () => {
                input.toggleAttribute('checked');

                this.statePropertiesHandler(input, innerPlaceholderElement);

            }, false);

            // Remove dot prefix.
            const selector = this.getProperty('selector').substr(1);

            // Handle master/slave input checkboxes.
            if (input.classList.contains(`${selector}`) && input.classList.contains(`checkbox-beautify--master`)) {
                // Add ev listener.
                input.addEventListener('click', (e) => this.handleMasterCheckbox(e));
            }
        }
    }

    handleMasterCheckbox(e) {
        const
            inputElement = e.target,
            slaveInputElements = document.querySelectorAll(`${this.getProperty('selector')}.checkbox-beautify--slave`)
        ;

        if (!slaveInputElements) {
            throw new Error('Using group of checkboxes you should indicate which checkboxes should be handled as slaves using [.checkbox-beautify--slave] class');
        }

        for (const slaveInputElement of slaveInputElements) {
            // Set toggle handler on master checkbox itself.
            // input.toggleAttribute('checked');
            const placeholderElement = slaveInputElement.nextElementSibling.children.item(0);

            // If master checkbox is set add select all slave checkboxes.
            if (inputElement.checked) {
                slaveInputElement.checked = true;
                placeholderElement.style.backgroundColor = this.getProperty('colorChecked');
            } else {
                slaveInputElement.checked = false;
                placeholderElement.style.backgroundColor = this.getProperty('colorUnchecked');
            }
        }
    }

    statePropertiesHandler(input, placeholderElement)
    {
        if (input.checked) {
            placeholderElement.style.backgroundColor = `${this.getProperty('colorChecked')}`;
        } else {
            placeholderElement.style.backgroundColor = `${this.getProperty('colorUnchecked')}`;
        }
    }

    /**
     * Add default style to checkbox' labels.
     *
     * @param element
     */
    static addLabelStyle(element) {
        element.style.display = 'inline-flex';
        element.style.cursor = 'pointer';
        element.style.userSelect = 'none';
    };

}