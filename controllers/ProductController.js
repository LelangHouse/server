const Product = require('../models/product')
const deletegcs = require('../helpers/deletegcs')
const twilio = require('twilio')
const client = twilio(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
);

class ProductController {
  static create(req, res, next) {
    Product.create({
      image: req.body.image,
      price: req.body.price,
      bid: req.body.price,
      user_id: req.loggedUser.id
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static read(req, res, next) {
    Product.find({})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static deleteArticle(req, res, next) {
    let { id } = req.params
    Product.findById(id)
      .then(result => {
        if (result) {
          deletegcs(result.image)
          return Product.deleteOne({ _id: id })
        } else {
          throw ({ status: 404, message: 'Article not found' })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static shareWa(req,res,next){
    client.messages
 .create({
   from: 'whatsapp:+14155238886',
   to: `whatsapp:${req.loggedUser.phoneNumber}`,
   body: 'hallo kami dari lelang-house',
   mediaUrl: req.body.url,
 })
 .then(message => {
   res.status(200).json('send via WA')
 })
 .catch(err => {
   console.error(err);
 });
  }

  static update(req, res, next){
    let id = req.params.id
    let { bid } = req.body
    let value = {
      bid: bid
    }

    Product
      .findById(id)
      .then(product => {
        if(req.body.bid < product.bid){
          value.bid = undefined
        }
        return Product.findByIdAndUpdate(id, value, { new: true, omitUndefined: true })
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ProductController