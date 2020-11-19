import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db, storage } from "../../utils/Firebase";
import Auth from "../../components/Auth";
import { AuthContext } from "../../context/Auth";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(13),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Create = () => {
    const [name, setName] = useState('');

    const [image, setImage] = useState(null);

    const { currentUser } = useContext(AuthContext);

    const router = useRouter();

    const classes = useStyles();

    const handleClick = async () => {
        const snapshot = await storage.ref().child(`/${currentUser.uid}/projects/${image.name}`).put(image);
        await db.collection('projects').add({name, user: currentUser.uid, thumbnail: snapshot.ref.fullPath});
        await router.push('/');
    };

    return (
        <Auth>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <TextField
                        type="text"
                        label="プロジェクト名"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <input
                        type="file"
                        onChange={event => setImage(event.target.files[0])}
                    />
                    <Button
                        type="button"
                        onClick={handleClick}
                        className={classes.submit}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        作成
                    </Button>
                </div>
            </Container>
        </Auth>
    );
};

export default Create;
