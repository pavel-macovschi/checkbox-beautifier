import Square from './square.js';
import Slider from './slider.js';

export default class CheckboxBeautifier {
  static VERSION = '1.1.1';

  static instancesMap = new Map([
    ['Square', Square],
    ['Slider', Slider],
  ]);

  static getObjectNames() {
    return Array.from(this.instancesMap.keys()).map(v => v + '()').join(', ');
  }

  static create(type, options) {

    if (!this.instancesMap.has(type)) {
      throw new Error(
          `Cannot create instance of: ${type}(), use one of these names:  ${this.getObjectNames()}`);
    }

    const instance = this.instancesMap.get(type);

    return new instance(options);
  }
}