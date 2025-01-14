import { Calendar, Globe, Home, Search, Settings, User2 } from "lucide-react";

export const agentMenu = {
  Tours: {
    items: [
      {
        title: "Home",
        url: "home",
        isActive: false,
        icon: Home,
      },
      {
        title: "Tours",
        url: "#",
        isActive: true,
        icon: Globe,
        items: [
          {
            title: "All Tours",
            url: "tours",
            isActive: false,
            icon: Globe,
          },
        ],
      },
      {
        title: "Calendar",
        url: "#",
        isActive: false,
        icon: Calendar,
      },
      {
        title: "Search",
        url: "#",
        isActive: false,
        icon: Search,
      },
      {
        title: "Settings",
        url: "#",
        isActive: false,
        icon: Settings,
      },
    ],
  },
  Apps: {
    items: [],
  },
  Settings: {
    items: [
      {
        title: "Profile Setting",
        url: "#",
        isActive: false,
        icon: User2,
      },
    ],
  },
};

export const TourFormControls = {
  left: [
    {
      groupLabel: "Basic Info",
      items: [
        {
          label: "Title",
          name: "title",
          componentType: "input",
          type: "text",
          required: true,
          placeholder: "Enter the tour title",
        },
        {
          label: "Description",
          name: "description",
          componentType: "textarea",
          type: "textarea",
          required: true,
          placeholder: "Enter the tour description",
        },
      ],
    },
    {
      groupLabel: "Media",
      items: [
        {
          label: "Tour Images",
          name: "images",
          componentType: "media",
          type: "image",
          placeholder: "Enter the tour images",
          required: false,
          multiple: true,
        },
      ],
    },
    {
      groupLabel: "Itinerary Details",
      items: [
        {
          label: "Itinerary",
          name: "itinerary",
          componentType: "itinerary",
          type: "itinerary",
          required: false,
        },
      ],
    },
  ],

  right: [
    {
      groupLabel: "Status",
      items: [
        {
          label: "Featured",
          name: "isFeatured",
          componentType: "checkbox",
          type: "checkbox",
          required: false,
        },
        {
          label: "Tour Status",
          name: "status",
          componentType: "select",
          type: "select",
          defaultValue: "INACTIVE",
          required: true,
          placeholder: "Select Status",
          options: [
            { handle: "ACTIVE", label: "Active" },
            { handle: "DRAFT", label: "Draft" },
          ],
        },
      ],
    },
    {
      groupLabel: "Pricing",
      items: [
        {
          label: "Price",
          name: "price",
          componentType: "number",
          type: "number",
          default: 0,
          min: 0,
          placeholder: "Enter the tour price",
          required: true,
        },
        {
          label: "Compare price",
          name: "comparePrice",
          componentType: "number",
          type: "number",
          default: 0,
          min: 0,
          placeholder: "Enter the tour compare price",
          required: true,
        },
      ],
    },
    {
      groupLabel: "Location",
      items: [
        {
          label: "City",
          name: "city",
          componentType: "select-specified",
          type: "text",
          required: true,
          placeholder: "Enter City",
        },
        // {
        //   label: "State",
        //   name: "state",
        //   componentType: "select-specified",
        //   type: "text",
        //   required: true,
        //   placeholder: "Enter State",
        // },
        // {
        //   label: "Country",
        //   name: "country",
        //   componentType: "select-specified",
        //   type: "text",
        //   required: true,
        //   placeholder: "Enter Country",
        // },
      ],
    },
    {
      groupLabel: "Extra Details (Optional)",
      items: [
        {
          label: "Duration",
          name: "duration",
          componentType: "input",
          type: "text",
          required: false,
          placeholder: "e.g. 2 Days 3 Nights",
        },
        {
          label: "Departure Date",
          name: "departureDate",
          componentType: "input",
          type: "text",
          required: false,
          placeholder: "e.g. Leaves 23 March 24",
        },
        {
          label: "Group Size",
          name: "groupSize",
          componentType: "input",
          type: "text",
          required: false,
          placeholder: "e.g. Group of 20 Peoples",
        },
      ],
    },
  ],
};
