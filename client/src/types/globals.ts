import { LucideIcon } from "lucide-react";

export interface IMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive: boolean;
  items?: IMenuItem[];
}

export interface IMenu {
  [key: string]: {
    items: IMenuItem[];
  };
}

export type CommonFormGroup = {
  left: {
    groupLabel: string;
    items: CommonFormItem[];
  }[];
  right: {
    groupLabel: string;
    items: CommonFormItem[];
  }[];
};

export type CommonFormItem = {
  label: string;
  name: string;
  componentType:
    | "input"
    | "checkbox"
    | "textarea"
    | "select"
    | "number"
    | "media"
    | "blank"
    | "itinerary"
    | "select-specified";
  type: string;
  required: boolean;
  placeholder: string;
  defaultValue?: string;
  options?: Array<{ handle: string; label: string }> | [];
  disabled?: boolean;
  min?: number;
  step?: number;
  default?: number;
  multiple?: boolean;
};
