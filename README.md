
# CoreElement - fastest and easiest way to build modern web UI

### Key Functions

* Component creation and registration in browser
* Work with templates (native syntax)
* Dynamic data bindings
* Component state management
* Reactions on attribute changes
* Property change callbacks
* Work with Shadow DOM polyfills (FireFox < 63; Edge)

### Concept Basics:

* Truly small and simple (KISS, please!)
* Flexible and extensible. As nothing else
* Based on modern web standards: [Custom Elements and Shadow DOM](https://www.webcomponents.org/specs)
* Native DOM APIs - are cool and powerful! Stop hiding them!
* Effective updates for DOM subtree nodes without fatty JavaScript abstractions
* Native HTML & CSS syntax in templates
* Code splitting for logic, markup and styles  - is a good practice
* Native ES Modules - are best for code decomposition
* No need for any specific build tools or environment setup
* OOP - is awesome!
* Performance matter

## Example

```html
<script type="module">
  import { CoreElement } from './core-element/core-element.js';

  class MyComponent extends CoreElement {

    constructor() {
      super();

      // `state` object describes all you need to manage component's state:
      // attribute values, properties, elements contents and user action handlers.
      this.state = {
        timestamp: Date.now(),
        heading: '<h1>Some Heading</h1>',
        clicksNum: 0,
        class: 'some-class',
        actions: {
          click: () => {
            this.setStateProperty('clicksNum', this.state.clicksNum + 1);
          },
        },
      };

    }

    // awakes when custom DOM attribute `reversed` is changed or defined
    set reversed(newVal) {
      if (this.hasAttribute('reversed')) {
        this.setStateProperty('actions.click', () => {
          this.setStateProperty('clicksNum', this.state.clicksNum - 1);
        });
      }
    }

  }

  // Can be stored as external module with a template string inside.
  // For correct syntax highlighting you will need IDE settings.
  // For example, *.css.js files can be setted as HTML type. 
  MyComponent.styles = `
  <style>
    :host {
      display: block;
    }
    .some-class {
      font-size: 40px;
      color: #00c;
    }
  </style>
  `;

  // Can be stored as external module with a template string inside.
  // For correct syntax highlighting you will need IDE settings.
  // For example, *.tpl.js files can be setted as HTML type. 
  MyComponent.template = `
  <div bind="onclick: actions.click; className: class">
    <div bind="textContent: timestamp"></div>
    <div bind="innerHTML: heading"></div>
    <div bind="textContent: clicksNum"></div>
    <slot></slot>
  </div>
  `;

  // All listed attributes will be accessible as property setters
  MyComponent.logicAttributes = [
    'reversed',
  ];

  // `is` property defines custom tag name for component
  MyComponent.is = 'my-component';
</script>

<my-component reversed></my-component>
```

## Slots

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot

## ES Modules

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

As your development or prototyping workflow, you can resolve all your project dependencies natively, with a modern browser. You will need local server only.

But it's not recommended for production purposes in complex applications. It's better to use module bundler, such as [webpack](https://webpack.js.org/) or [rollup.js](https://rollupjs.org/guide/en).

## Livecycle (native)

`constructor()`
- Component is not added to DOM, child and parent nodes are NOT available
- Shadow DOM is created and can be used
- Any inner modifications are not calling browser redraws

`connectedCallback()`
- Component added to DOM
- Child elements and parent nodes - are available
- Browser starts to draw component

`disconnectedCallback()`
- Component removed from DOM

## Template Bindings

Example:
```html
<div bind="textContent: name; className: styling.name; onclick: actions.click"></div>
```

Template bindings can be described in key-value format. So, key - is a own element property and value - is a path to `state` object field.

>ATTENTION: if element has no explicitly defined property (`undefined`) - value will be setted as attribute.

## External Bindings

External bindings is intended for external connections creation (outside of the templates). They can be used for regular HTML-pages to establish a connection between custom elements. Without coding.

Example:
```html
<tabs-ui current="v1" bind-id="my-binding" bind-prop="current">
  <tab-ui value="v1" icon="default">Cat</tab-ui>
  <tab-ui value="v2" icon="default">Dog</tab-ui>
  <tab-ui value="v3" icon="default">Fish</tab-ui>
</tabs-ui>

<tabs-context bind-id="my-binding" bind-prop="current">
  <div ctx="v1">
    CAT
  </div>
  <div ctx="v2">
    DOG
  </div>
  <div ctx="v3">
    FISH
  </div>
</tabs-context>
```

## Template Shortcuts

If unique ID of the template element contains the dash symbol (`-`)  - it will be available as component's own property.

Example:
```html
<button-ui id="my-button"></button-ui>
```

```javascript
this['my-button'].onclick = () => { ... };
```

Property `$` - can be used as a shortcut for the component's Shadow DOM.

Example:
```javascript
let divsCollection = this.$.querySelectorAll('div');
```

## Methods

`setStateProperty(path, value)` - updates component's `state` property.

Example:
```javascript
this.setStateProperty('user.name', 'John');
```

`setStatePropertyLater(path, value, debounceTimeout)` - updates component's `state` property asynchronously, using last actual value.

Example:
```javascript
this['input-element'].oninput = () => {
  this.setStatePropertyLater('user.name', this['input-element'].value, 200);
};
```

`updateTemplateBindings()` - if needed, rewrites component's bindings map after Shadow DOM update.

`notify(propName, propValue)` - implement to call for external callback - `on<Prop>Change` - with a new value as parameter.

Example:
```javascript
// internal code:
this.notify('checked', true);

// external code:
checkbox.onCheckedChange = (newValue) => { ... };
```

`whenConnected` - asynchronous handler. Called after rendering started.

`onStateUpdated` - state update stage handler.


## Need more abilities?

Just extend it!
```javascript
class MySuperFrameworkClass extends CoreElement {

  coolFunction() {
    ...
  }

}
```

## Browser Support & Polyfills 

https://github.com/WebComponents/webcomponentsjs

### Native Support (caniuse.com)

* [Custom Elements](https://caniuse.com/#feat=custom-elementsv1)
* [Shadow DOM](https://caniuse.com/#feat=shadowdomv1)
* [ES Modules](https://caniuse.com/#feat=es6-module)


## Quick Installation

`git submodule add -b master https://github.com/foxeyes/core-element core-element`

[About git submodules](https://blog.github.com/2016-02-01-working-with-submodules/)
