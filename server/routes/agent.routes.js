import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import agentCtrl from '../controllers/agent.controller'

const router = express.Router()

router.route('/api/agents/new/:userId')
  .post(authCtrl.requireSignin, agentCtrl.create)

router.route('/api/agents/photo/:agentId')
  .get(agentCtrl.photo)

router.route('/api/agents/by/:userId')
  .get(authCtrl.requireSignin, agentCtrl.listByUser)

router.route('/api/agents/feed/:userId')
  .get(authCtrl.requireSignin, agentCtrl.listNewsFeed)

router.route('/api/agents/like')
  .put(authCtrl.requireSignin, agentCtrl.like)
router.route('/api/agents/unlike')
  .put(authCtrl.requireSignin, agentCtrl.unlike)

router.route('/api/agents/comment')
  .put(authCtrl.requireSignin, agentCtrl.comment)
router.route('/api/agents/uncomment')
  .put(authCtrl.requireSignin, agentCtrl.uncomment)

router.route('/api/agents/:agentId')
  .delete(authCtrl.requireSignin, agentCtrl.isPoster, agentCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('agents', agentCtrl.agentByID)

export default router
