// import React, { useEffect } from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import { useNavigate } from "react-router-dom";
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import { clearErrors, register, loaduser } from '../../../actions/userAction'
// import { useDispatch, useSelector } from "react-redux"
// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }
// const useStyles = makeStyles((theme) => ({

//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));
// export default function SignUp() {
//     let navigate= useNavigate();

//     // let initialValue = {
//         // name:'',
//         // email: '',
//         // password: ''
//     // }
//     // const [val, setVal] = useState(initialValue)
//     const dispatch = useDispatch();
//     const { user, isAuthenticated, error } = useSelector(state => state.user);
//     useEffect(() => {
//         if (error) {
//           dispatch(clearErrors())
//         }
//         if (isAuthenticated) {
//         //   history.push("/")
//         navigate('/');

//         }
//       }, [isAuthenticated, user, error, dispatch, clearErrors])
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         const val={
//             name:data.get('name'),
//             email:data.get('email'),
//             password:data.get('password')
//         }
//         dispatch(register(val));
//         console.log(val);
//     };
//     const classes = useStyles();
//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <div className={classes.paper}>
//                 <Avatar className={classes.avatar}>
//                     <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Sign up
//                 </Typography>
//                 <form className={classes.form} noValidate onSubmit={handleSubmit}>
//                     <TextField
//                         variant="outlined"
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="name"
//                         label="Name"
//                         name="name"
//                         autoComplete="name"
//                         autoFocus
//                     />
//                     <TextField
//                         variant="outlined"
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                         autoFocus
//                     />
//                     <TextField
//                         variant="outlined"
//                         margin="normal"
//                         required
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type="password"
//                         id="password"
//                         autoComplete="current-password"
//                     />

//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         className={classes.submit}
//                     >
//                         Sign Up
//                     </Button>
//                 </form>
//             </div>
//             <Box mt={8}>
//                 <Copyright />
//             </Box>
//         </Container>
//     );
// }
