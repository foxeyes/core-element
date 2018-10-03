export const BUTTON_COM_CSS = `
<style>
  :host {
    display: inline-flex;
    align-items: center;
    height: var(--tap-zone-size);
    border-radius: var(--radius);
    user-select: none;
    cursor: pointer;
    border: 1px solid currentColor;
    border-bottom: 3px solid currentColor;
    padding-left: 0.6em;
    padding-right: 0.6em;
    box-sizing: border-box;
  }
  :host(:hover) {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
</style>
`;