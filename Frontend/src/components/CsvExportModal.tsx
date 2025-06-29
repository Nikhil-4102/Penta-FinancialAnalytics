// CsvExportModal.tsx or bottom of same file

import React from "react";

const CSV_FIELDS = [
  { key: "user_id", label: "User ID" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
  { key: "user_profile", label: "User Profile" }
];

interface CsvExportModalProps {
  onClose: () => void;
  transactions: any[];
}

const CsvExportModal: React.FC<CsvExportModalProps> = ({ onClose, transactions }) => {
  const [selectedFields, setSelectedFields] = React.useState(CSV_FIELDS.map(f => f.key));
  const [downloading, setDownloading] = React.useState(false);

  const handleFieldChange = (key: string) => {
    setSelectedFields(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  };

  const handleExport = () => {
    setDownloading(true);
    const header = selectedFields.map(key => {
      const found = CSV_FIELDS.find(f => f.key === key);
      return found ? found.label : key;
    });

    const rows = transactions.map(row =>
      selectedFields.map(key => {
        let value = row[key];
        if (key === "date" && value) {
          value = new Date(value).toLocaleString();
        }
        return typeof value === "string" || typeof value === "number" ? value : "";
      })
    );

    const csvContent = [header, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_export_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloading(false);
      onClose();
    }, 500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-[#2A2B31] p-8 rounded-xl shadow-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            aria-label="Close"
            disabled={downloading}
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 text-green-400">Export CSV</h2>
          <div className="mb-4">
            <p className="text-gray-300 mb-2">Select columns to export:</p>
            <div className="grid grid-cols-2 gap-2">
              {CSV_FIELDS.map(field => (
                <label key={field.key} className="flex items-center gap-2 text-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field.key)}
                    onChange={() => handleFieldChange(field.key)}
                    disabled={downloading}
                  />
                  {field.label}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleExport}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 w-full disabled:opacity-60"
            disabled={downloading || selectedFields.length === 0}
          >
            {downloading ? "Exporting..." : "Export & Download"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CsvExportModal;
