export const APP_INDEX_TPL = `
<layout-com>
  <div slot="header" bind="textContent: headerTxt"></div>
  <div slot="menu">
    <button-com>Button 1</button-com>
    <button-com>Button 2</button-com>
    <button-com>Button 3</button-com>
  </div>
  <div bind="textContent: contentTxt"></div>
  <div slot="footer" bind="textContent: footerTxt"></div>
</layout-com>
`;