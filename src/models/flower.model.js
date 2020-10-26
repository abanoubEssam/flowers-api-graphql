const mongoose = require('mongoose');
import { FLOWER_MODEL_NAME, SHOP_MODEL_NAME } from '../constants';

const flowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: SHOP_MODEL_NAME
  },
  price: {
    type: Number,
    required: true
  },
  flowerImg: {
    type: String
  },
  sponsored: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }
)
export const FlowerModel = mongoose.model(FLOWER_MODEL_NAME, flowerSchema);