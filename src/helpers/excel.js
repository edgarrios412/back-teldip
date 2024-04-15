const XLSX = require("xlsx");

module.exports = {
  excelToJson: (path) => {
    const excel = XLSX.readFile(path);
    const nombreHojas = excel.SheetNames;
    const datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHojas[0]]);
    return datos;
  },
};
