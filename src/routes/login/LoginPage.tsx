import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { FormattedMessage, useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useNotifications } from '../../components/Notifications/NotificationsProvider'
import { LoginFrom } from './types'
import { useUsers } from '../../components/UserContext/UserContextProvider'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const LoginPage: React.FC = () => {
    const classes = useStyles()
    const intl = useIntl()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { authUser } = useUsers()
    const history = useHistory()
    const notify = useNotifications()

    const onSubmit = (data: LoginFrom) => {
        if (authUser(data.user, data.password)) {
            history.push('/')
        } else {
            notify?.(intl.formatMessage({ id: 'login.errorMessage' }))
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <FormattedMessage id="login.title" />
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
                        label={intl.formatMessage({ id: 'login.user' })}
                        autoComplete="user"
                        autoFocus
                        error={errors?.user}
                        {...register('user', { required: true })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label={intl.formatMessage({ id: 'login.password' })}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={errors?.password}
                        {...register('password', { required: true })}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                    >
                        <FormattedMessage id="login.signIn" />
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                <FormattedMessage id="login.signUpLink" />
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default LoginPage
