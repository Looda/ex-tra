import { Category } from "../../../../components/RecordsContext/types";

export interface CategoryDialogProps {
  open: boolean;
  category?: Partial<Category>;
  onSave: (category: Category) => void;
  onClose: () => void;
}

export interface CategoryForm {
  name: string;
}
