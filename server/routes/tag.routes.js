import express from 'express'
import authCtrl from '../controllers/auth.controller'
import tagCtrl from '../controllers/tag.controller'

const router = express.Router()

router.route('/api/tags/new/:userId')
  .post(authCtrl.requireSignin, tagCtrl.create)

router.route('/api/tags/:tagId')
  .delete(authCtrl.requireSignin, tagCtrl.remove)
router.param('tagId', tagCtrl.tagByID)

export default router
