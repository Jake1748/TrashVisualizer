const router = require('express').Router()
const { models: { User, Trashbag }} = require('../db')
module.exports = router

// GET /api/trash
router.get('/', async (req, res, next) => {
  try {

  // AUTHORIZATION CHECK
  const token = req.headers.authorization
  const userByToken = await User.findByToken(token)

  if(!userByToken){
    res.sendStatus(401)
  }

    const trash = await Trashbag.findAll({
  })
    res.json(trash)
  } catch (err) {
    next(err)
  }
})

// GET /api/trash/user/id
router.get('/user/:id', async (req, res, next) => {
  try {

  // AUTHORIZATION CHECK
  const token = req.headers.authorization
  const userByToken = await User.findByToken(token)

  if(!userByToken){
    res.sendStatus(401)
  }

    const trash = await Trashbag.findAll({
      where: {userId: req.params.id},

  })
    res.json(trash)
  } catch (err) {
    next(err)
  }
})
// GET /api/trash/id
router.get('/:id', async (req, res, next) => {
  try {

  // AUTHORIZATION CHECK
  const token = req.headers.authorization
  const userByToken = await User.findByToken(token)

  if(!userByToken){
    res.sendStatus(401)
  }

    const trash = await Trashbag.findByPk(req.params.id)

    res.json(trash)
  } catch (err) {
    next(err)
  }
})
// POST /api/trash/id
router.post('/cart/:userId', async (req, res, next) => {
  try {

  // AUTHORIZATION CHECK
  const token = req.headers.authorization
  const userByToken = await User.findByToken(token)

  if(!userByToken){
    res.sendStatus(401)
  }
    const orderProduct = await OrderProducts.findOrCreate({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    if (!orderProduct[1]) {
      orderProduct[0].quantity += 1
      await orderProduct[0].save()
    }
    res.send(orderProduct[0])
  } catch(e) {
    next(e)}
})
  // PUT /api/orders/id/
  router.put('/:id', async (req, res, next) => {
    try {

     // AUTHORIZATION CHECK
     const token = req.headers.authorization
     const userByToken = await User.findByToken(token)

     if(!userByToken){
       res.sendStatus(401)
     }


      const order = await Order.findByPk(req.params.id);
      res.send(await order.update(req.body));
    } catch (err) {
      next(err)
    }
  })
// DELETE /api/trash/id
router.delete('/:id', async (req, res, next) => {
  try {

   // AUTHORIZATION CHECK
   const token = req.headers.authorization
   const userByToken = await User.findByToken(token)

   if(!userByToken){
     res.sendStatus(401)
   }

    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.send(order);
  } catch (err) {
    next(err)
  }
})