const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    image: String,
    price: Number,
    bid: Number,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
)


const Product = model('Product', productSchema)
module.exports = Product