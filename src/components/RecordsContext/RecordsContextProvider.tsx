import React, { useContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  Categories,
  Records,
  Record,
  RecordsContextValue,
  RecordsProviderProps,
  StoreRecord,
} from "./types";

export enum RECORD_TYPE {
  INCOME = "income",
  EXPENSE = "expense",
}

const RecordsContext = React.createContext<Partial<RecordsContextValue>>({});

const getMaxId = (items: { id: number }[]) =>
  items?.length > 0 ? Math.max(...items.map(({ id }) => id ?? 0)) : 0;

export const useRecords = (userId: string) => {
  const {
    categories = [],
    saveCategories,
    records = [],
    saveRecords,
  } = useContext(RecordsContext);

  const addCategory = (name: string) => {
    saveCategories?.([
      ...categories,
      {
        id: getMaxId(categories) + 1,
        name,
        userId,
      },
    ]);
  };

  const editCategory = (id: number, name: string) => {
    const index = categories.findIndex((category) => category.id === id);
    const newCategories = [
      ...categories.slice(0, index),
      {
        id,
        name,
        userId,
      },
      ...categories.slice(index + 1),
    ];
    saveCategories?.(newCategories);
  };

  const removeCategory = (id: number) => {
    saveCategories?.(categories.filter((category) => category.id !== id));
  };

  const addRecord = (record: Partial<Record>) => {
    saveRecords?.([
      ...records,
      {
        id: getMaxId(records) + 1,
        ...record,
        userId,
      } as StoreRecord,
    ]);
  };

  const editRecord = (id: number, record: Record) => {
    const index = records.findIndex((record) => record.id === id);
    const newRecords = [
      ...records.slice(0, index),
      {
        ...records[index],
        ...record,
      },
      ...records.slice(index + 1),
    ];
    saveRecords?.(newRecords);
  };

  const removeRecord = (id: number) => {
    saveRecords?.(records.filter((record) => record.id !== id));
  };

  return {
    categories: categories.filter((category) => category.userId === userId),
    addCategory,
    removeCategory,
    editCategory,
    records: records.filter((record) => record.userId === userId),
    addRecord,
    editRecord,
    removeRecord,
  };
};

export const RecordsProvider: React.FC<RecordsProviderProps> = ({
  children,
}) => {
  const [recordsStore, setRecordsStore] = useLocalStorage("records", []);
  const [categoriesStore, setCategoriesStore] = useLocalStorage(
    "categories",
    []
  );
  const [records, setRecords] = useState<Records>(recordsStore);
  const [categories, setCategories] = useState<Categories>(categoriesStore);

  const saveRecords = (value: Records) => {
    setRecords(value);
    setRecordsStore(value);
  };

  const saveCategories = (value: Categories) => {
    setCategories(value);
    setCategoriesStore(value);
  };

  return (
    <RecordsContext.Provider
      value={{ records, saveRecords, categories, saveCategories }}
    >
      {children}
    </RecordsContext.Provider>
  );
};
