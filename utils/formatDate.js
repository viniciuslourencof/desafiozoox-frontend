export const formatDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split(/[-/]/);
    if (year.length === 4) return `${year}-${month}-${day}`;
    return `${day}-${month}-${year}`;
  };
  