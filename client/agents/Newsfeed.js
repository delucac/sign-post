import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import AgentList from './AgentList'
import {listNewsFeed} from './api-agent.js'
import NewAgent from './NewAgent'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}))
export default function Newsfeed () {
  const classes = useStyles()
  const [agents, setAgents] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listNewsFeed({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setAgents(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])

  const addAgent = (agent) => {
    const updatedAgents = [...agents]
    updatedAgents.unshift(agent)
    setAgents(updatedAgents)
  }
  const removeAgent = (agent) => {
    const updatedAgents = [...agents]
    const index = updatedAgents.indexOf(agent)
    updatedAgents.splice(index, 1)
    setAgents(updatedAgents)
  }

    return (
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Newsfeed
        </Typography>
        <Divider/>
        <NewAgent addUpdate={addAgent}/>
        <Divider/>
        <AgentList removeUpdate={removeAgent} agents={agents}/>
      </Card>
    )
}

