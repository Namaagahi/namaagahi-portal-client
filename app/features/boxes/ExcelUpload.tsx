import { FC, useState } from "react";
import * as XLSX from "xlsx";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import { useTheme } from "next-themes";

interface IExcelUploadProps {
  onDataExtracted: any;
  useExcel: Boolean;
  setUseExcel: any;
}

const ExcelUpload: FC<IExcelUploadProps> = ({
  onDataExtracted,
  useExcel,
  setUseExcel,
}) => {
  const { theme } = useTheme();
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Store the file name in state
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const result = e.target.result;
          if (result instanceof ArrayBuffer) {
            const data = new Uint8Array(result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName]
            );

            // Assuming the structure data is in the first sheet
            onDataExtracted(worksheet);
          } else {
            console.error("Expected ArrayBuffer from FileReader.");
          }
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const color = theme === "dark" ? "white" : "";

  return (
    <div className="formContainer">
      <div className="flex justify-center">
        <small className="pr-3 mt-1.5 text-slate-500 inline-block font-bold">
          فایل سازه ها
        </small>
        <div className=" mx-4">
          <button
            style={{ color: color }}
            type="button"
            onClick={() => setUseExcel(!useExcel)}
          >
            {useExcel ? <FaToggleOff size={25} /> : <FaToggleOn size={25} />}
          </button>
        </div>
      </div>
      <label htmlFor="file-upload" className="custom-file-upload">
        انتخاب فایل
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
      />

      {fileName && (
        <div style={{ color: color, marginTop: "5px" }}>
          فایل انتخاب شده : {fileName}
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
