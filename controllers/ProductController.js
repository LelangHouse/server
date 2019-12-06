const Product = require('../models/product')

const deletegcs = require('../helpers/deletegcs')

class ProductController {
  static create(req, res, next) {
    Product.create({
      image: req.body.image,
      price: req.body.price,
      bid: 0,
      user_id: req.loggedUser.id
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static deleteProduct(req, res, next) {
    let { id } = req.params
    Product.findById(id)
      .then(result => {
        if (result) {
          deletegcs(result.image)
          return Product.deleteOne({ _id: id })
        } else {
          throw ({ status: 404, message: 'Product not found' })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

}

module.exports = ProductController