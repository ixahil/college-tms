import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CountryCityStateSelect = ({
  label,
  name,
}: {
  label: string;
  name: string;
}) => {
  const { formState, control } = useFormContext();

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(
    formState.defaultValues.country || ""
  );
  const [availableStates, setAvailableStates] = useState<any[]>([]);
  // Fetch and parse CSV
  useEffect(() => {
    async function fetchAndParseCSV() {
      try {
        const response = await fetch("/states.csv"); // Fetch CSV from public folder
        if (!response.ok) throw new Error("Failed to fetch CSV file");

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            if (result.data && result.data.length > 0) {
              const uniqueCountries = [
                ...new Set(result.data.map((item: any) => item.country_name)),
              ];
              setCountries(uniqueCountries);
              setStates(result.data);
            } else {
              console.warn("CSV contains no data.");
            }
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
      }
    }

    fetchAndParseCSV();
  }, []);

  const filteredStates = useMemo(() => {
    if (!selectedCountry) return [];
    return states
      .filter((state: any) => state.country_name === selectedCountry)
      .flatMap((state) => state.name); // Extracts the state name
  }, [selectedCountry, states]);

  // Update available states when filteredStates change
  useEffect(() => {
    setAvailableStates(filteredStates);
  }, [filteredStates]);

  return (
    <div className="w-full space-y-4">
      {/* Country Select */}
      <FormField
        control={control}
        name={`country`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel htmlFor={name}>Country</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedCountry(value); // Set country when changed
              }}
              value={String(field.value)} // Ensure this is controlled
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={"Select Country"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((option, idx) => (
                  <SelectItem key={option + idx} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage>
              {formState?.errors[`country`]?.message as string}
            </FormMessage>
          </FormItem>
        )}
      />

      {/* State Select (based on selected country) */}
      <FormField
        control={control}
        name={`state`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel htmlFor={name}>State</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
              }}
              value={String(field.value)} // Ensure this is controlled
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableStates.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage>
              {formState?.errors[`state`]?.message as string}
            </FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CountryCityStateSelect;
