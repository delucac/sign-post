import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import Newsfeed from './../post/Newsfeed'
import Sign from './../assets/images/blank-signpost.png'
import NewPlaceB from "./NewPlaceB";
import NewPost from "../post/NewPost";
import {listNewsFeed} from "../post/api-post";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 400
    },
    credit: {
        padding: 10,
        textAlign: 'right',
        backgroundColor: '#ededed',
        borderBottom: '1px solid #d0d0d0',
        '& a':{
            color: '#3f4771'
        }
    }
}))

export default function Places({history}){
    const classes = useStyles()
    const [defaultPage, setDefaultPage] = useState(false)

    useEffect(()=> {
        setDefaultPage(auth.isAuthenticated())
        const unlisten = history.listen (() => {
            setDefaultPage(auth.isAuthenticated())
        })
        return () => {
            unlisten()
        }
    }, [])

    listNewsFeed({
        userId: jwt.user._id
    }, {
        t: jwt.token
    }, signal).then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            setPosts(data)
        }
    })
    return function cleanup(){
        abortController.abort()
    }

    const addPost = (post) => {
        const updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPosts(updatedPosts)
    }

    const addPlace = (place) => {
        const updatedPlacces = [...places]
        updatedPlaces.unshift(place)
        setPlaces(updatedPlacces)
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                Places
            </Typography>
            <Grid container spacing={8}>
                <Grid item xs={12}>

                    <Card className={classes.card}>

                        <CardContent>
                        </CardContent>
                    </Card>
                    <Card>
                        <Typography variant="h6" className={classes.title}>
                            Create a Place
                        </Typography>
                        <CardContent>
                            <NewPost addUpdate={addPost}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
