# Checkbox Beautifier

## Add custom css styles to input checkboxes to make it unique and beautiful to match you own web design.

## It is written in pure javascript and completely CSS free, without extra dependencies.

#### Browser's compatibility:

- Firefox latest
- Google - latest
- Opera - latest
- IE Edge - latest

## Square checkbox type.

#### Initialization with default properties.

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
  
  import CheckboxBeautifier from './src/index.js';

  // Initialization with default properties.
  CheckboxBeautifier.create('Square');
</script>
```

### Add a package using the yarn package manager.
```yarn
$   yarn add checkbox-beautifier
``` 

##### Webpack bundler usage and import.

```js
import CheckboxBeautifier from "checkbox-beautifier";

// Initialization with default properties.
CheckboxBeautifier.create('Square');
```

### Initialization with custom properties.

```html

<script type="module">

  import CheckboxBeautifier from './src/index.js';

  // Initialization with custom properties.
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

`properties` is an object literal with the following properties:

- `colorChecked` — Matches checked state of input checkbox, you can apply naming colors like green, red, etc. or hex,
  hsla, rgba `black` or `rgba(0,0,0,1)`. Default value is set to `black` color

- `colorUnchecked` — Matches initial (unchecked) state of input checkbox, you can apply naming colors `black`
  or `rgba(0,0,0,1)`. Default value is set to `black` color

- `border` — Checkbox border, standard css border style. Default value is set to `1px solid black`

- `size` — Checkbox size in px, you may set any size you want to match your design style. Default value is set to `24px`

- `borderRadius` — If you want to make checkbox corners to be rounded, default value is set to `1px`

- `paddedSpace` — This property added space between outer border, it is not limited so mostly depends on a size of
  checkbox and your design. Increase or decrease it cautiously by 1px and check how it looks. Default value is set
  to `4px`

- `shadow` — Add shadow from the outer box, If you want shadow to be disabled just set value to `none`. Default value is
  set to `0 0 4px rgba(0, 0, 0, 0.5)`

- `transition` — Added css transition effect between checked/unchecked states. Default value is set
  to `all ease-out 0.2s`

- `selector` — If you want to use custom selector, set value to `.your-custom-selector`. Default value is set 
to `.checkbox-beautify-square`.

## If you need to use a group of checkboxes.

### Use areGrouped property and set its value to true.

```html

<script type="module">
  
  import CheckboxBeautifier from './src/index.js';

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
