import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm, Controller } from "react-hook-form";
import { RecordDialogProps, RecordForm } from "./types";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { RECORD_TYPE } from "../../../../components/RecordsContext/RecordsContextProvider";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const RecordDialog: React.FC<RecordDialogProps> = ({
  open,
  record,
  categories,
  onSave,
  onClose,
}) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleClose = () => {
    onClose();
  };

  const saveData = (data: RecordForm) => {
    onSave({
      ...record,
      ...data,
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open={open} onClose={handleClose}>
        <form noValidate onSubmit={handleSubmit(saveData)}>
          <DialogTitle id="form-dialog-title">
            <FormattedMessage id="record.addDialog.title" />
          </DialogTitle>
          <DialogContent>
            <Controller
              name="date"
              control={control}
              defaultValue={record?.date ?? Date.now()}
              render={({ field: { onChange, onBlur, value } }) => (
                <DateTimePicker
                  fullWidth
                  error={errors?.date}
                  label={intl.formatMessage({ id: "record.addDialog.date" })}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <FormControl fullWidth error={errors?.type}>
              <InputLabel>
                <FormattedMessage id="record.addDialog.type" />
              </InputLabel>
              <Select
                error={errors?.type}
                defaultValue={record?.type}
                {...register("type")}
              >
                {Object.values(RECORD_TYPE).map((type) => (
                  <MenuItem value={type} key={type}>
                    <FormattedMessage
                      id={`record.type.${type.toLowerCase()}`}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>
                <FormattedMessage id="record.addDialog.category" />
              </InputLabel>
              <Select
                error={errors?.categoryId}
                defaultValue={record?.categoryId}
                {...register("categoryId")}
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              label={intl.formatMessage({ id: "record.addDialog.value" })}
              fullWidth
              error={errors?.value}
              type="number"
              defaultValue={record?.value}
              {...register("value", { required: true })}
            />
            <TextField
              autoFocus
              margin="dense"
              label={intl.formatMessage({ id: "record.addDialog.note" })}
              fullWidth
              error={errors?.note}
              defaultValue={record?.note}
              {...register("note")}
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
    </MuiPickersUtilsProvider>
  );
};

export default RecordDialog;
