import Papa from "papaparse";

export const parseCSV = async (
  csv: string
): Promise<{ data: any[]; error: string | null }> => {
  return new Promise((resolve) => {
    Papa.parse(csv, {
      download: true,
      header: true,
      complete: (result) => {
        const parsedData = result.data;
        resolve({ data: parsedData, error: null });
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        resolve({ data: [], error: "Parsing Error" });
      },
    });
  });
};
