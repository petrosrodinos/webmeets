import { OptionItem } from "../interfaces/components";

export const SERVICE_CATEGORIES: OptionItem[] = [
  {
    value: "physical training",
    label: "Physical Training",
  },
  {
    value: "psychology",
    label: "Psychology",
  },
  {
    value: "nutrition",
    label: "Nutrition",
  },
  {
    value: "physiotherapy",
    label: "Physiotherapy",
  },
  {
    value: "consulting",
    label: "Consulting",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "programming",
    label: "Programming",
  },
  {
    value: "music",
    label: "Music",
  },
  {
    value: "languages",
    label: "Languages",
  },
  {
    value: "logistics",
    label: "Logistics",
  },
];

export const SERVICE_CATEGORIES_ARRAY = SERVICE_CATEGORIES.map((category) => category.value);

export const COUNTRIES: OptionItem[] = [
  {
    label: "Greece",
    value: "greece",
  },
  {
    label: "Italy",
    value: "italy",
  },
  {
    label: "France",
    value: "france",
  },
  {
    label: "Germany",
    value: "germany",
  },
];
