import React, {useState} from "react";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Grid, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {addNewsRequest} from "../../store/actions/newsActions";

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        width: "90%",
        margin: "0 auto",
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
    title: {
        textAlign: "center",
    }
}));

const AddWareHouseAdmin = () => {
    const [inputList, setInputList] = useState([{newField: "", newValue: ""}]);

    // handle input change
    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, {newField: "", newValue: ""}]);
    };

    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.news.createLoading);
    const error = useSelector(state => state.news.addError);

    const [news, setNews] = useState({
        title: "",
        image: null,
        description: "",
    });


    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(news).forEach(key => {
            formData.append(key, news[key]);
        });
        dispatch(addNewsRequest(formData));
        setNews({
            title: "",
            image: null,
            description: "",
        })
    };


    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setNews(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setNews(prevState => {
            return {...prevState, [name]: file};
        });
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const handleEditorChange = (content) => {
        console.log(content);
        setNews(prevState => {
            return {...prevState, description: content}
        });
    };

    return (
        <Container
            component="section"
            maxWidth="md"
            className={classes.container}>
            <Grid
                container
                direction="column"
                spacing={2}
                component="form"
                autoComplete="off"
                onSubmit={submitFormHandler}
                noValidate
            >
                <h3 className={classes.title}>Добавить склад</h3>
            </Grid>

            {inputList.map((x, i) => {
                return (

                    <div className="box" key={i}>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    name="newField"
                                    id="new-field"
                                    label="Введите название"
                                    placeholder="Название"
                                    margin="normal"
                                    fullWidth
                                    value={x.newField}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="newValue"
                                    id="full-width-text-field"
                                    label="Введите значение"
                                    placeholder="Значение"
                                    margin="normal"
                                    fullWidth
                                    value={x.newValue}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </Grid>
                            <Grid container>

                                <Grid item xs={5}>
                                {inputList.length - 1 === i &&
                                    <Button onClick={handleAddClick}
                                       color="primary"
                                       className={classes.submit}
                                    > Добавить поле
                                    </Button>}
                                </Grid>

                                <Grid item xs={5}>
                                {inputList.length !== 1 && <Button
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => handleRemoveClick(i)}>Удалить поле</Button>}
                                </Grid>

                            </Grid>
                        </Grid>
                    </div>


                );
            })}


            <Grid item xs={12}>
                <ButtonWithProgress
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    loading={loading}
                    disabled={loading}
                >
                    Добавить
                </ButtonWithProgress>
            </Grid>
            <div style={{marginTop: 20}}>{JSON.stringify(inputList)}</div>
        </Container>
    );

};

export default AddWareHouseAdmin;