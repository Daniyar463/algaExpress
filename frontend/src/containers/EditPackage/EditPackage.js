import React, {useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import {Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {changePackageRequest} from "../../store/actions/packageRegisterActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FormElement from "../../components/UI/Form/FormElement";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '50px',
    },

    packageBtnContainer: {
        textAlign: 'center',
    },

    form: {
        display: 'flex'
    },

    packageMainTitle: {
        textAlign: 'center',
        paddingBottom: '50px',
        '@media (max-width:600px)': {
            padding: '10px',
        },
    },

    textField: {
        '&:last-child': {
            marginBottom: '50px',
        },
    },
}));

const theme = createTheme();

theme.typography.h4 = {
    fontSize: '1.3rem',
    '@media (min-width:600px)': {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

const EditPackage = ({packageData, params}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.package.changePackageError);
    const loading = useSelector(state => state.package.editUserPackageLoading);

    const [editPackage, setEditPackage] = useState({
        trackNumber: packageData.trackNumber,
        title: packageData.title,
        amount: packageData.amount,
        price: packageData.price,
        country: packageData.country,
    });

    const inputChangeHandler = event => {
        let {name, value} = event.target;

        if (name === 'amount' || name === 'price' || name === 'width' || name === 'length' || name === 'height') {
            if (event.target.value < 0) {
                value = 0;
                setEditPackage(prevState => ({...prevState, [name]: value}));
            }
        }

        setEditPackage(prevState => ({...prevState, [name]: value}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const messagesEndRef = useRef(null);
    const changePackage = (e) => {
        e.preventDefault();
        dispatch(changePackageRequest({editPackage, packageId: params.id}));
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                ref={messagesEndRef}
                component="section"
                maxWidth="md"
                className={classes.container}>
                <Grid item>
                    <Typography
                        variant="h4"
                        className={classes.packageMainTitle}>
                        Редактирование посылки
                    </Typography>
                </Grid>
                <Grid
                    component="form"
                    onSubmit={changePackage}
                    justifyContent="center"
                    container
                    noValidate
                    spacing={5}
                >
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <FormControl variant="outlined" fullWidth error={Boolean(getFieldError('country'))}>
                            <InputLabel id="demo-controlled-open-select-label">Страна</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={editPackage.country}
                                label="Страна"
                                name="country"
                                required
                                onChange={inputChangeHandler}
                            >
                                <MenuItem value={'usa'}>USA</MenuItem>
                                <MenuItem value={'turkey'}>Turkey</MenuItem>
                                {editPackage.country === 'china' ? (
                                    <MenuItem value={'china'}>China</MenuItem>
                                ) : (
                                    <MenuItem value={'chinaGround'}>China</MenuItem>
                                )}

                            </Select>
                            <FormHelperText error={true}>{error?.errors?.['country']?.message}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <FormElement
                        xs={12} sm={8} md={7} lg={7}
                        name="trackNumber"
                        value={editPackage.trackNumber}
                        required
                        fullWidth
                        onChange={inputChangeHandler}
                        label="Трек-номер"
                        error={getFieldError('trackNumber')}
                    />

                    <FormElement
                        xs={12} sm={8} md={7} lg={7}
                        name="title"
                        value={editPackage.title}
                        onChange={inputChangeHandler}
                        required
                        fullWidth
                        label="Название"
                        error={getFieldError('title')}
                    />

                    <FormElement
                        xs={12} sm={8} md={7} lg={7}
                        name="amount"
                        type="number"
                        value={editPackage.amount}
                        onChange={inputChangeHandler}
                        fullWidth
                        required
                        label="Количество"
                        error={getFieldError('amount')}
                    />

                    <FormElement
                        xs={12} sm={8} md={7} lg={7}
                        name="price"
                        type="number"
                        fullWidth
                        value={editPackage.price}
                        onChange={inputChangeHandler}
                        required
                        label="Цена"
                        error={getFieldError('price')}
                    />

                    <Grid item xs={12} sm={8} md={7} lg={7}
                          className={classes.packageBtnContainer}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            variant="contained">
                            Оформить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default EditPackage;