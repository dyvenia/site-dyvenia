export const sortByOrderIndex = items => {
  if (!Array.isArray(items)) {
    return [];
  }

  return [...items].sort((itemA, itemB) => {
    const orderIndexA = Number(itemA?.data?.show_on_about_order ?? 9999);
    const orderIndexB = Number(itemB?.data?.show_on_about_order ?? 9999);

    if (orderIndexA !== orderIndexB) {
      return orderIndexA - orderIndexB;
    }

    const nameA = itemA?.data?.name ?? '';
    const nameB = itemB?.data?.name ?? '';
    return nameA.localeCompare(nameB);
  });
};
