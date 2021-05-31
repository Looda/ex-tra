export interface RecordsProviderProps {
  children: React.ReactNode;
}

export interface StoreRecord extends Record {
  id: number;
  userId: string;
}

export interface Record {
  date: Date;
  categoryId: number;
  value: number;
  type: RECORD_TYPE;
  note: string;
}

export type Records = StoreRecord[];

export interface StoreCategory extends Category {
  id: number;
  userId: string;
}

export interface Category {
  name: string;
}

export type Categories = StoreCategory[];

export interface RecordsContextValue {
  records: Records;
  saveRecords: (records: Records) => void;
  categories: Categories;
  saveCategories: (categories: Categories) => void;
}
