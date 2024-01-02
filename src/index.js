import Square from "./square.js";

export default class CheckboxBeautifier {
    static VERSION = '1.0.4';
    static allowableInstances = ['Square'];

    static getFormattedInstancesNames() {
        return CheckboxBeautifier.allowableInstances.map(v => v + '()').join(', ');
    }

    static create(type, options) {
        switch (type) {
            case 'Square':
                return new Square(options);
            default:
                throw new Error(`
                    Cannot create instance of: ${type}(), 
                    allowable objects to instantiate: ${CheckboxBeautifier.getFormattedInstancesNames()}
                `);
        }
    }
}