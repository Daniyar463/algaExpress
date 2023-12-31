import React, {useEffect, useRef, useState} from "react";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Editor} from "@tinymce/tinymce-react";
import {changePagesRequest, fetchPagesRequest} from "../../store/actions/pagesAction";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 767,
        },
    },
});

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 767,
        },
    },

    container: {
        width: "90%",
        margin: "0 auto",
        marginTop: '16px',
        paddingTop: '170px',
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: '90px',
        },
    },
}));

const EditPages = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.page);

    const [data, setData] = useState({
        page: "",
        text: "",
    });

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        if (!!page) {
            setData({page: page.nameURL, text: page.text});
        }
    }, [page, messagesEndRef]);

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(changePagesRequest(data));
        setData({page: "", text: ""});
    };

    const inputChangeHandler = e => {
        dispatch(fetchPagesRequest(e.target.value));

        setData(prevState => {
            return {...prevState, text: page.text};
        });
    };

    const handleEditorChange = (content) => {
        setData(prevState => {
            return {...prevState, text: content}
        });
    };

    return (
        <Container
            component="section"
            maxWidth="md"
            ref={messagesEndRef}
            className={classes.container}
            style={{textAlign: 'center'}}
        >
            <Grid
                container
                direction="column"
                spacing={2}
                component="form"
                autoComplete="off"
                onSubmit={submitFormHandler}
                noValidate
            >
                <h3 style={theme.title}>Отредактировать страницу</h3>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-controlled-open-select-label">Страница</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            defaultValue=''
                            label="Страница"
                            value={data.page === undefined ? '' : data.page}
                            name="page"
                            required
                            onChange={inputChangeHandler}
                        >
                            <MenuItem value={''}/>
                            <MenuItem value={'rules'}>Правила</MenuItem>
                            <MenuItem value={'about'}>О нас</MenuItem>
                            <MenuItem value={'how'}>Как это работает?</MenuItem>
                            <MenuItem value={'faq'}>FAQ</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <Editor
                        apiKey='jucp3aljkh783o2yj0379rihg44ldm2wgjxvz10pu9i9m7ja'
                        value={data.text}
                        init={{
                            height: 600,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image',
                                'charmap print preview anchor help',
                                'searchreplace visualblocks code',
                                'insertdatetime media table paste wordcount'
                            ],
                            toolbar:
                                'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolory | outdent indent'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </Grid>

                <Grid item xs={12} sm={7} md={7} lg={5}>
                    <ButtonWithProgress
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{marginBottom: '30px'}}
                    >
                        Изменить
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditPages;