"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";

const ItineraryElement = ({}: {
  name: string;
  label: string;
  required: string;
}) => {
  const { setValue, getValues } = useFormContext();
  const data = getValues("itinerary") || [];

  const [itineraryItems, setItineraryItems] = useState(
    data.length > 0
      ? data
      : [
          { label: "Day 1", description: "Day 1 Todo" }, // default itinerary
        ]
  );

  const handleChange = (index: number, field: string, value: string) => {
    const updatedItems = [...itineraryItems];
    updatedItems[index][field] = value;
    setItineraryItems(updatedItems);

    setValue("itinerary", updatedItems, { shouldValidate: true });
  };

  // Add a new itinerary item
  const addItineraryItem = () => {
    const count = itineraryItems.length;
    setItineraryItems([
      ...itineraryItems,
      { label: `Day ${count}`, description: `Day ${count} Todo` },
    ]);
  };

  return (
    <div className="w-full space-y-4">
      {itineraryItems.map((item, index) => (
        <div key={index} className="space-y-2">
          <Input
            value={item.label}
            onChange={(e) => handleChange(index, "label", e.target.value)}
            placeholder="Enter Title"
          />
          <Textarea
            value={item.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            placeholder="Enter Description"
          />
        </div>
      ))}
      <Button variant={"outline"} type="button" onClick={addItineraryItem}>
        Add More
      </Button>
    </div>
  );
};

export default ItineraryElement;
