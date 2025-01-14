import { countryData, stateData, cityData } from "@/configs/constant";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form"; // Ensure this is imported if using react-hook-form
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
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [availableStates, setAvailableStates] = useState(stateData["India"]);
  const { formState, control } = useFormContext();

  useEffect(() => {
    if (selectedCountry) {
      setAvailableStates(stateData[selectedCountry] || []);
    }
  }, [selectedCountry]);

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
                {countryData.map((option) => (
                  <SelectItem key={option.handle} value={option.handle}>
                    {option.label}
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
                  <SelectItem key={option.handle} value={option.handle}>
                    {option.label}
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
