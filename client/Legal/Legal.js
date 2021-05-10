import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

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
    color: theme.palette.text.secondary,
    textAlign: 'center'
  },
  media: {
    minHeight: 400
  },
  TOC: {
    padding: 10,
    backgroundColor: '#ededed',
    borderStyle: 'solid',
    '& a':{
      color: '#3f4771'
    }
  }
}))

export default function Home({history}){
  const classes = useStyles()
  const [defaultPage, setDefaultPage] = useState(false)

  return (
      <div className={classes.root}>
        { !defaultPage &&
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography type="body1" component="p" className={classes.title} id="Top">
                  Legal Policies
                </Typography>
                <Typography variant="body2" component="p" className={classes.TOC} color="textSecondary">
                  Policies
                  <ul>
                    <li><a href="#Privacy">Privacy Policy</a></li>
                    <li><a href="#Terms">Terms of Service</a></li>
                    <li><a href="#3rdParty">3rd Party Resources</a></li>
                    <li><a href="#About">About</a></li>
                  </ul>
                </Typography>
              </CardContent>
              <hr/>
              <CardContent className="Policies">
                <Typography type="body1" component="p" className={classes.title} id="Privacy">
                  Privacy Policy
                </Typography>
                <Typography>
                  <h2 id="PAD">Publicly Accessible Data</h2>
                  <div>
                    Any data publicly accessible on the site can be searched for or seen by other websites. Keep this in mind when sharing data on the website.
                  </div>
                  <hr/>
                  <h2 id="UA">User Accounts</h2>
                  <div>
                    The following account data is accessible by users on this website.
                    <ul>
                      <li>The name you provided</li>
                      <li>Account creation date</li>
                      <li>Users who follow you</li>
                      <li>Users who you follow</li>
                      <li>Your public posts</li>
                    </ul>
                    The following account data can potentially be viewed by admins for the purpose of enforcing our Terms of Service Policy. The following account data may also be viewed by developers for the purpose of testing and database management.
                    <ul>
                      <li>Data already accessible by users on this website</li>
                      <li>Email address provided</li>
                      <li>Hashed password (we do not store your passwords in readable forms)</li>
                      <li>Account creation time</li>
                    </ul>
                    <ul>

                    </ul>
                  </div>
                  <hr/>
                  <h2 id="LD">Location Data</h2>
                  <div>
                    We only store location data for the purpose of linking events to places. Location owners have the right to remove their location from our system. Private addresses are only shared with event invitees. Private addresses are not publicly shared on our website. Business addresses may be publicly listed as a method to advertise your venue.
                  </div>
                  <br/>
                  <h5 id="LD3PA">3rd Party Access</h5>
                  <div>
                    Location data may be shared with Open Street Map solely for the purpose of displaying maps and locations. Location data given to our site is also subject to their privacy policy.
                    <br/>
                    <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy">OpenStreetMap Privacy Policy</a>
                  </div>
                  <hr/>
                  <h2 id="ED">Event Data</h2>
                  <div>
                    Public event data may be publicly Accessible and advertised on the website. Private event data is only shared with invitees of the event. Invitees & attendees will have access to the data until it is deleted from our system.
                  </div>
                  <hr/>
                  <h2 id="DEF">Definitions</h2>
                  <div>
                    <ul>
                      <li>User: An account owner on this website.</li>
                      <li>Invitee: A user who has been invited to an event.</li>
                      <li>Attendee: A user who has attended an event.</li>
                    </ul>
                  </div>
                </Typography>
                <hr/>
                <Typography type="body1" component="p" className={classes.title} id="Terms">
                  Terms Of Service
                </Typography>
                <Typography>
                  By creating an account on this service, you agree to these Terms of Service. This agreement provides standards for how we may act on your data, and how you may utilize our website.
                  <br/>
                  <h5>How we utilize your data.</h5>
                  <div>
                    We only share your data with OpenStreetMap for the purpose of showing mapping information.
                  </div>
                  <br/>
                  <h5>How you may utilize our services.</h5>
                  <div>
                    You may utilize our service to advertise events as places you own or have permission to host events at.
                  </div>
                  <br/>
                  <h5>Termination Policy</h5>
                  <div>
                    In the event that you are found to be abusing these services, creating excessive entries which serve no purpose (spam), or attempt to ruin the expereince for other users, we may chose to suspend your account.
                  </div>
                </Typography>
                <hr/>
                <Typography type="body1" component="p" className={classes.title} id="3rdParty">
                  3rd Party Resources
                </Typography>
                <Typography>
                  <div>
                    Mapping data is provided by the OpenStreetMap Foundation.
                    <br/>
                    <a href="https://www.openstreetmap.org/copyright">Copyright Information</a>
                    <br/>
                    <a href="https://www.openstreetmap.org/">OpenStreetMap.org</a>
                    <br/>
                    <a href="https://wiki.openstreetmap.org/wiki/API">OpenStreetMap API</a>
                  </div>
                </Typography>
                <hr/>
                <Typography type="body1" component="p" className={classes.title} id="About">
                  About
                </Typography>
                <Typography>
                  <div>
                    This project was created by Christopher B. DeLuca as a capstone project.
                  </div>
                </Typography>
                <hr/>
                <Typography>
                  <a href="#Top">Return to top</a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        }
      </div>
  )
}
