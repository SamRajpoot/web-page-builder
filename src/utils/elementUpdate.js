// Update an element in a nested tree by id
export function updateElementInTree(tree, id, updater) {
  return tree.map(el => {
    if (el.id === id) return updater(el);
    if (el.children) return { ...el, children: updateElementInTree(el.children, id, updater) };
    return el;
  });
}
