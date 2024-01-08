# Checkbox Beautifier

## Add custom css styles to input checkboxes to make it unique and beautiful to match you own web design.

## It is written in pure javascript and completely CSS free, without extra dependencies.

#### Browser's compatibility:

- Firefox latest
- Google - latest
- Opera - latest
- IE Edge - latest

## Square checkbox type.

#### Initialization with default options.

```html

<form>
  <!-- Input is placed inside label -->
  <label>
    Banana
    <input type="checkbox" name="fruits[]" value="banana" class="checkbox-beautify-square">
  </label>

  <!-- If you want to use label separately -->
  <label for="bar">Mango</label>
  <input id="bar" type="checkbox" name="fruits[]" value="mango" class="checkbox-beautify-square">
</form>
```

##### If you are not going to use a bundler like a webpack just put a script tag with a module type at the bottom of html page.

```html

<script type="module">
  
  import CheckboxBeautifier from './src';

  // Initialization Square type with default options.
  CheckboxBeautifier.create('Square');
  
  // Initialization Slider type with default options.
  CheckboxBeautifier.create('Slider');
  
</script>
```

### Add a package using the yarn package manager.
```yarn
$   yarn add checkbox-beautifier
``` 

##### Webpack bundler usage and import.

```js
import CheckboxBeautifier from "checkbox-beautifier";

// Initialization Square type with default options.
CheckboxBeautifier.create('Square');

// Initialization Slider type with default options.
CheckboxBeautifier.create('Slider');

```

### Initialization with custom options.

```html

<script type="module">

  import CheckboxBeautifier from './src';

  // Initialization with custom options.
  CheckboxBeautifier.create('Square', {
    colorChecked: 'brown',
    colorUnchecked: 'lightgrey',
    border: '1px solid brown',
    size: '26px',
    borderRadius: '2px',
    paddedSpace: '4px',
    // If you use custom selector, it should be included in every input instead of default one.
    selector: '.my-custom-selector',
    shadow: '0 0 4px rgba(0, 200, 0, 0.4)',
    transition: 'all 0.6s ease'
  });
</script>
```

### Square checkbox type `options` is an object literal with the following options:

- `colorChecked` — Matches checked state of input checkbox, you can apply naming colors like green, red, etc. or hex,
  hsla, rgba `black` or `rgba(0,0,0,1)`. Default value is set to `black` color

- `colorUnchecked` — Matches initial (unchecked) state of input checkbox, you can apply naming colors `black`
  or `rgba(0,0,0,1)`. Default value is set to `black` color

- `border` — Checkbox border, standard css border style. Default value is set to `1px solid black`

- `size` — Checkbox size in px, you may set any size you want to match your design style. Default value is set to `24px`

- `borderRadius` — If you want to make checkbox corners to be rounded, default value is set to `1px`

- `paddedSpace` — This property added space between outer border, it is not limited so mostly depends on a size of
  checkbox and your design. Increase or decrease it cautiously by 1px and check how it looks. Default value is set to `4px`

- `shadow` — Add shadow from the outer box, If you want shadow to be disabled just set value to `none`. Default value is set to `0 0 4px rgba(0, 0, 0, 0.5)`
  
- `transition` — Add css transition property between checked/unchecked states. Default value is set to `all 0.4s`

- `selector` — If you want to use custom selector, set value to `.your-custom-selector`. Default value is set to `.checkbox-beautify-square` 

- `areGrouped` — If you need a group of checkboxes that will be handled with a master checkbox. Default value is set to `false`. Also you need to specify which checkbox will be master and which are will be as slaves using css class. You can find out more in demo-slide.html file. 

### Slider checkbox type `options` is an object literal with the following options:

- `handleColorChecked` — Matches checked state of input checkbox, you can apply preferable css3 color value like hex, rgba, hsla or color naming green, red, etc. Default value is set to `white`
  
- `handleColorUnchecked` — Matches unchecked state of input checkbox, you can apply preferable css3 color value like hex, rgba, hsla or color naming green, red, etc. Default value is set to `lightblue`
    
- `boxColorChecked` — Matches checked state of input checkbox, you can apply preferable css3 color value like hex, rgba, hsla or color naming green, red, etc. Default value is set to `lightblue`

- `boxColorUnchecked` — Matches checked state of input checkbox, you can apply preferable css3 color value like hex, rgba, hsla or color naming green, red, etc. Default value is set to `white`

- `boxWidth` — Width size of a slider box. Default value is set to `80px`

- `boxHeight` — Width size of a slider box. Default value is set to `30px`

- `boxBorder` — Slider box border is a standard css border style. Default value is set to `1px solid rgba(0,0,0,.3)`

- `handleSize` — Size of a slider' handle. Size value cannot be more than a boxHeight value. Default value is set to `30px`

- `borderRadius` — Radius is applied for both handle and boxBorder. You can set different value to see an effect. For example to make slider without radius set value to `0` after it will be fully rectangle. Default value is set to `30px`

- `transition` — Add css transition property between checked/unchecked states. Default value is set to `all 0.4s`

- `selector` — If you want to use custom selector, set value to `.my-custom-selector`. Default value is set to `.checkbox-beautify-slider`

- `shadow` — Add shadow from the outer box border, If you want shadow to be disabled just set value to `none`. Default value is set to `0 0 4px lightgray`

- `areGrouped` — If you need a group of checkboxes that will be triggered with a master checkbox. Default value is set to `false`. Also you need to specify which checkbox will be master and which are will be as slaves using css class. You can find out more in demo-slide.html file. 

## If you need to use a group of checkboxes.

### Use areGrouped option and set its value to true.

```html

<script type="module">
  
  import CheckboxBeautifier from './src';

  CheckboxBeautifier.create('Square', {
      areGrouped: true
  });
  
</script>
```

### Add .checkbox-beautify--master class for a master input checkbox and .checkbox-beautify--slave class for slave input checkboxes.

```html

<form>
  <!-- Master checkbox -->
  <label>
    Select all colors
    <input type="checkbox" class="checkbox-beautify-square checkbox-beautify--master">
  </label>

  <!-- Slave checkbox -->
  <label>
    Orange
    <input type="checkbox" name="colors[]" value="orange" class="checkbox-beautify-square checkbox-beautify--slave">
  </label>
  <!-- Slave checkbox -->
  <label>
    Brown
    <input type="checkbox" name="colors[]" value="brown" class="checkbox-beautify-square checkbox-beautify--slave">
  </label>
  <!-- Slave checkbox -->
  <label>
    Black
    <input type="checkbox" name="colors[]" value="black" class="checkbox-beautify-square checkbox-beautify--slave">
  </label>
</form>
```

### Helper method `getOptions()`

```html

<script type="module">
  
  import CheckboxBeautifier from './src';

  const square = CheckboxBeautifier.create('Square');
  
  // Returns all available options in a readable way.
  square.getOptions(); 
  
</script>
```