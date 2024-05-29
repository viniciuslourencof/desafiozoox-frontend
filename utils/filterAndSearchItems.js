export const filterAndSearchItems = (items, searchQuery, filterCriteria) => {
    let filteredItems = items;
  
    if (searchQuery) {
      filteredItems = filteredItems.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  
    if (filterCriteria.column && filterCriteria.value) {
      filteredItems = filteredItems.filter((item) =>
        String(item[filterCriteria.column])
          .toLowerCase()
          .includes(filterCriteria.value.toLowerCase())
      );
    }
  
    return filteredItems;
  };
  