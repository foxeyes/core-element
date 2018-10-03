import { CoreElement } from '../../../../src/core-element.js';
import { LAYOUT_COM_CSS } from './layout-com.css.js';
import { LAYOUT_COM_TPL } from './layout-com.tpl.js';

class LayoutCom extends CoreElement {}

LayoutCom.styles = LAYOUT_COM_CSS;
LayoutCom.template = LAYOUT_COM_TPL;
LayoutCom.is = 'layout-com';

export { LayoutCom };