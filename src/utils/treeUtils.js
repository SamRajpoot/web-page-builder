// Utilities for nested element tree management

export function addElementToTree(tree, parentId, newElement) {
  if (!parentId) {
    return [...tree, newElement];
  }
  return tree.map((el) => {
    if (el.id === parentId) {
      if (!el.children) el.children = [];
      return { ...el, children: [...el.children, newElement] };
    }
    if (el.children) {
      return { ...el, children: addElementToTree(el.children, parentId, newElement) };
    }
    return el;
  });
}

export function updateElementInTree(tree, id, updater) {
  return tree.map((el) => {
    if (el.id === id) {
      return updater(el);
    }
    if (el.children) {
      return { ...el, children: updateElementInTree(el.children, id, updater) };
    }
    return el;
  });
}

export function findElementInTree(tree, id) {
  for (const el of tree) {
    if (el.id === id) return el;
    if (el.children) {
      const found = findElementInTree(el.children, id);
      if (found) return found;
    }
  }
  return null;
}
