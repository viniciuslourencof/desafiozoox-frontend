export const exportToCSV = (items) => {
    if (items.length === 0) return;
  
    const header = Object.keys(items[0]).join(",");
    const csv = [
      header,
      ...items.map((item) =>
        Object.values(item)
          .map((value) =>
            typeof value === "string" && value.includes(",")
              ? `"${value}"`
              : value
          )
          .join(",")
      ),
    ].join("\n");
  
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  