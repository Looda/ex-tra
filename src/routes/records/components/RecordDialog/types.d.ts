import {
  Categories,
  Record,
} from "../../../../components/RecordsContext/types";

export interface RecordDialogProps {
  open: boolean;
  record?: Partial<Record>;
  categories?: Categories;
  onSave: (record: Record) => void;
  onClose: () => void;
}

export interface RecordForm extends Record {}
