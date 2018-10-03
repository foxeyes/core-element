import { CoreElement } from '../../../src/core-element.js';
import { APP_INDEX_CSS } from './app-index.css.js';
import { APP_INDEX_TPL } from './app-index.tpl.js';

import { } from '../components/button/button-com.js';
import { } from '../components/layout/layout-com.js';

class AppIndex extends CoreElement {

  constructor() {
    super();
    this.state = {
      headerTxt: 'HEADER',
      contentTxt: 'CONTENT',
      footerTxt: 'FOOTER',
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.removeAttribute('unresolved');
  }
}

AppIndex.styles = APP_INDEX_CSS;
AppIndex.template = APP_INDEX_TPL;
AppIndex.is = 'app-index';