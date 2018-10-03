import { CoreElement } from '../../../../src/core-element.js';
import { BUTTON_COM_CSS } from './button-com.css.js';
import { BUTTON_COM_TPL } from './button-com.tpl.js';

class ButtonCom extends CoreElement {

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'button');
  }

}

ButtonCom.styles = BUTTON_COM_CSS;
ButtonCom.template = BUTTON_COM_TPL;
ButtonCom.is = 'button-com';

export { ButtonCom };