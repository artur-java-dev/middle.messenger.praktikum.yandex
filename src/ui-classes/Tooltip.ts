//@ts-nocheck
class Tooltip {

  constructor() {
    this.el = document.createElement('div');
    this.el.style.position = 'absolute';
    this.el.classList.add(this.classname);
    document.body.appendChild(this.el);

    this.onHide = this.onHide.bind(this);
    this.listeners = [];
  }

  get classname() {
    return 'tooltip';
  }

  get classShow() {
    return "tooltip_active";
  }

  get attrWithText() {
    return 'data-tooltip';
  }

  get indent() {
    return 4;
  }

  delegate(eventName, element, cssSelector, callback) {
    const func = event => {
      if (event.target.matches(cssSelector))
        callback(event);
    };

    element.addEventListener(eventName, func);
    this.listeners.push({ func, element, eventName });

    return this;
  }


  onShow(event) {
    this.el.textContent = event.target.getAttribute(this.attrWithText);
    this.el.classList.add(this.classShow);
    this.setPos(event.target);
  }

  onHide() {
    this.el.classList.remove(this.classShow);
  }

  setPos(elem) {
    const rect = elem.getBoundingClientRect();
    const minH = this.el.offsetHeight + this.indent;
    const left = rect.left;
    const top = (rect.y <= minH) ?
      `${rect.bottom + this.indent}px` :
      `${rect.top - minH}px`;

    this.el.style.top = `${top + window.scrollY}px`;
    this.el.style.left = `${left + window.scrollX}px`;
  }


  attach(rootElem) {
    const select = `[${this.attrWithText}]`;
    this
      .delegate('mouseover', rootElem, select, this.onShow)
      .delegate('mouseout', rootElem, select, this.onHide);
  }

  detach() {
    for (let { func, element, eventName: e } of this.listeners) {
      element.removeEventListener(e, func);
    }

    this.listeners = [];
  }

}
