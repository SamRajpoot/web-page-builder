// Move an element in a nested tree from one index to another (same level)
export function reorderTree(tree, fromIdx, toIdx) {
  if (fromIdx === toIdx) return tree;
  const arr = [...tree];
  const [moved] = arr.splice(fromIdx, 1);
  arr.splice(toIdx, 0, moved);
  return arr;
}
