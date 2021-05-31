import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { CategoryDialogProps, CategoryForm } from "./types";

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  open,
  category,
  onSave,
  onClose,
}) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    onClose();
  };

  const saveData = (data: CategoryForm) => {
    onSave({
      ...category,
      ...data,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form noValidate onSubmit={handleSubmit(saveData)}>
        <DialogTitle id="form-dialog-title">
          <FormattedMessage id="category.addDialog.title" />
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={intl.formatMessage({ id: "category.addDialog.name" })}
            fullWidth
            id="name"
            error={errors?.name}
            defaultValue={category?.name}
            {...register("name", { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="common.cancel" />
          </Button>
          <Button type="submit" color="primary">
            <FormattedMessage id="common.save" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryDialog;
