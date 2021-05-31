import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { FormattedMessage, useIntl } from "react-intl";
import { useUsers } from "../../../../components/UserContext/UserContextProvider";
import {
  RECORD_TYPE,
  useRecords,
} from "../../../../components/RecordsContext/RecordsContextProvider";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import RecordDialog from "../RecordDialog";
import { Record } from "../../../../components/RecordsContext/types";
import format from "date-fns/format";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  rowIncome: {
    backgroundColor: "#a5d6a7",
  },
  rowExpense: {
    backgroundColor: "#b39ddb",
  },
});

const RecordsList: React.FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { currentUser } = useUsers();
  const {
    categories = [],
    records = [],
    addRecord,
    editRecord,
    removeRecord,
  } = useRecords(currentUser);

  const [dialogId, setDialogId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setDialogId(null);
    setOpen(true);
  };

  const handleEdit = (id: number) => {
    setDialogId(id);
    setOpen(true);
  };

  const handleSave = (record: Record) => {
    if (dialogId === null) {
      addRecord(record);
    } else {
      editRecord(dialogId, record);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (id: number) => {
    removeRecord(id);
  };

  const datetimeFormat = intl.formatMessage({ id: "common.datetime" });

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <FormattedMessage id="records.columns.date" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="records.columns.category" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="records.columns.note" />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage id="records.columns.value" />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.id}
                className={
                  record.type === RECORD_TYPE.INCOME
                    ? classes.rowIncome
                    : classes.rowExpense
                }
              >
                <TableCell>
                  {record.type === RECORD_TYPE.INCOME ? (
                    <AddIcon />
                  ) : (
                    <RemoveIcon />
                  )}
                </TableCell>
                <TableCell>{format(record.date, datetimeFormat)}</TableCell>
                <TableCell>
                  {categories.find(
                    (category) => category.id === record.categoryId
                  )?.name ?? ""}
                </TableCell>
                <TableCell>{record.note}</TableCell>
                <TableCell align="right">{record.value}</TableCell>
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label={intl.formatMessage({ id: "records.edit" })}
                    onClick={() => handleEdit(record.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label={intl.formatMessage({ id: "records.remove" })}
                    onClick={() => handleRemove(record.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleAdd}>
        <FormattedMessage id="records.addRecord" />
      </Button>
      {open && (
        <RecordDialog
          open
          record={records?.find((record) => record.id === dialogId)}
          categories={categories}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default RecordsList;
