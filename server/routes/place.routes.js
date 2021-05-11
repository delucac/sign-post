import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import placeCtrl from '../controllers/place.controller'

const router = express.Router()

router.route('/api/places/new/:userId')
  .post(authCtrl.requireSignin, placeCtrl.create)

router.route('/api/places/photo/:placeId')
  .get(placeCtrl.photo)

router.route('/api/places/by/:userId')
  .get(authCtrl.requireSignin, placeCtrl.listByUser)

router.route('/api/places/feed/:userId')
  .get(authCtrl.requireSignin, placeCtrl.listNewsFeed)

router.route('/api/places/like')
  .put(authCtrl.requireSignin, placeCtrl.like)
router.route('/api/places/unlike')
  .put(authCtrl.requireSignin, placeCtrl.unlike)

router.route('/api/places/comment')
  .put(authCtrl.requireSignin, placeCtrl.comment)
router.route('/api/places/uncomment')
  .put(authCtrl.requireSignin, placeCtrl.uncomment)

router.route('/api/places/:placeId')
  .delete(authCtrl.requireSignin, placeCtrl.isPoster, placeCtrl.remove)

router.route('/api/places/review')
  .put(authCtrl.requireSignin, placeCtrl.review)
router.route('/api/places/unreview')
  .put(authCtrl.requireSignin, placeCtrl.unreview)

router.route('/api/places/:placeId')
  .delete(authCtrl.requireSignin, placeCtrl.isCreator, placeCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('placeId', placeCtrl.placeByID)

export default router
