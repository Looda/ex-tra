import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { SignUpFrom } from "./types";
import { useUsers } from "../../components/UserContext/UserContextProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addUser } = useUsers();
  const history = useHistory();
  const onSubmit = (data: SignUpFrom) => {
    addUser(data.user, data.password);
    history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage id="signup.title" />
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label={intl.formatMessage({ id: "signup.user" })}
            autoComplete="user"
            autoFocus
            error={errors?.user}
            {...register("user", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={intl.formatMessage({ id: "signup.password" })}
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors?.password}
            {...register("password", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={intl.formatMessage({ id: "signup.passwordConfirm" })}
            type="password"
            id="password-confirm"
            autoComplete="current-password"
            error={errors?.password}
            {...register("passwordConfirm", { required: true })}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className={classes.submit}
          >
            <FormattedMessage id="signup.signUp" />
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
