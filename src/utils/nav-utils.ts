import { renderBlock } from "../view-base/Block";
import { CompositeBlock } from "../view-base/CompositeBlock";

function navigateTo(page: CompositeBlock) {

  deleteBlock("#app");
  renderBlock("#app", page);

}

function deleteBlock(query: string) {

  const root = document.querySelector(query);
  const nodes = Array.from(root!.children);
  nodes.forEach((_) => _.remove());

}

export { navigateTo };
