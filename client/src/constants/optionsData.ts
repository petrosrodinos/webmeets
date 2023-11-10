import { OptionItem } from '@/interfaces/components';

export const SERVICE_CATEGORIES: OptionItem[] = [
  {
    label: 'physical training',
    value: 'Physical Training',
  },
  {
    label: 'psychology',
    value: 'Psychology',
  },
  {
    label: 'nutrition',
    value: 'Nutrition',
  },
  {
    label: 'physiotherapy',
    value: 'Physiotherapy',
  },
  {
    label: 'consulting',
    value: 'Consulting',
  },
  {
    label: 'business',
    value: 'Business',
  },
  {
    label: 'marketing',
    value: 'Marketing',
  },
  {
    label: 'design',
    value: 'Design',
  },
  {
    label: 'programming',
    value: 'Programming',
  },
  {
    label: 'music',
    value: 'Music',
  },
  {
    label: 'languages',
    value: 'Languages',
  },
  {
    label: 'logistics',
    value: 'Logistics',
  },
];

export const SERVICE_CATEGORIES_ARRAY = SERVICE_CATEGORIES.map((category) => category.value);

export const COUNTRIES: OptionItem[] = [
  {
    label: 'Greece',
    value: 'greece',
  },
  {
    label: 'Italy',
    value: 'italy',
  },
  {
    label: 'France',
    value: 'france',
  },
  {
    label: 'Germany',
    value: 'germany',
  },
];
