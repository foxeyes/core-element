
# CoreElement - fastest and easiest way to build modern web-application UI

### What for?

* Component creation and registration in browser
* Work with templates (native syntax)
* Dynamic data bindings
* Component state management
* Reactions on attribute changes
* Property change callbacks
* Work with Shadow DOM polyfills (FireFox < 63; Edge)

### Concept basics:

* Small and simple
* Flexible and extensible
* Based on modern web standards: [Custom Elements and Shadow DOM](https://www.webcomponents.org/specs)
* Native DOM APIs - are cool!
* Effective updates for DOM nodes without fatty JavaScript abstractions
* Native HTML & CSS syntax in templates
* Code splitting for logic, markup and styles  - is a good practice
* Native ES Modules - are best for code decomposition
* No need for any specific build tools or environment setup
* OOP - is awesome!
* Perfomance matter

## Example

```html
<script type="module">
  import { CoreElement } from './core-element/core-element.js';

  class MyComponent extends CoreElement {

    constructor() {
      super();

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

    set reversed(newVal) {
      if (this.hasAttribute('reversed')) {
        this.setStateProperty('actions.click', () => {
          this.setStateProperty('clicksNum', this.state.clicksNum - 1);
        });
      }
    }

  }

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

  MyComponent.template = `
  <div bind="onclick: actions.click; className: class">
    <div bind="textContent: timestamp"></div>
    <div bind="innerHTML: heading"></div>
    <div bind="textContent: clicksNum"></div>
    <slot></slot>
  </div>
  `;

  MyComponent.logicAttributes = [
    'reversed',
  ];

  MyComponent.is = 'my-component';
</script>

<my-component reversed></my-component>
```
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

<context-lay bind-id="my-binding" bind-prop="current">
  <div ctx="v1">
    CAT
  </div>
  <div ctx="v2">
    DOG
  </div>
  <div ctx="v3">
    FISH
  </div>
</context-lay>
```

## Template Shortcuts

If unique ID of the template element contains symbol `-` - it will be available as component's own property.

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
let divElementsCollection = this.$.querySelectorAll('div');
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
  this.setStatePropertyLater('user.name', 'John', 200);
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

## Browser Support & Polyfills 

https://github.com/WebComponents/webcomponentsjs

