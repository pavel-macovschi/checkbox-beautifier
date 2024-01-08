import Square from './square.js'
import Slider from './slider.js'

export default class CheckboxBeautifier {
  static VERSION = '1.1.0'
  static allowableInstances = ['Square', 'Slider']

  static getObjectNames () {
    return CheckboxBeautifier.allowableInstances.map(v => v + '()').join(', ')
  }

  static create (type, options) {
    switch (type) {
      case 'Square':
        return new Square(options)
      case 'Slider':
        return new Slider(options)
      default:
        throw new Error(`
            Cannot create instance of: ${type}(), 
            allowable objects to instantiate: ${CheckboxBeautifier.getObjectNames()}
        `)
    }
  }
}