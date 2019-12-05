const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    image: String,
    price: Number,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    bid: Number
  }
)


const Product = model('Product', productSchema)
module.exports = Product