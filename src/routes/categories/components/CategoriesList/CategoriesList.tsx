import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useRecords } from "../../../../components/RecordsContext/RecordsContextProvider";
import Button from "@material-ui/core/Button";
import CategoryDialog from "../CategoryDialog";
import { Category } from "../../../../components/RecordsContext/types";
import { useUsers } from "../../../../components/UserContext/UserContextProvider";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      minWidth: "40%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

const CategoriesList: React.FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { currentUser } = useUsers();
  const {
    categories = [],
    addCategory,
    editCategory,
    removeCategory,
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

  const handleSave = (category: Category) => {
    if (dialogId === null) {
      addCategory(category.name ?? "");
    } else {
      editCategory(dialogId, category.name);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (id: number) => {
    removeCategory(id);
  };

  return (
    <>
      <List className={classes.root}>
        {categories.map((category, index) => (
          <ListItem key={category.id} divider={index < categories.length - 1}>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label={intl.formatMessage({ id: "categories.edit" })}
                onClick={() => handleEdit(category.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label={intl.formatMessage({ id: "categories.remove" })}
                onClick={() => handleRemove(category.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleAdd}>
        <FormattedMessage id="categories.addCategory" />
      </Button>
      {open && (
        <CategoryDialog
          open
          category={categories?.find((category) => category.id === dialogId)}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default CategoriesList;
