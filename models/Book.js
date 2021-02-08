const mongoose = require("mongoose");
const { token } = require("morgan");
const { transliterate, slugify } = require("transliteration");

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Номын нэрийг оруулна уу"],
      unique: true,
      trim: true,
      maxlength: [250, "Номын нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    author: {
      type: String,
      required: [true, "Зохиогчийн нэрийг оруулна уу"],
      trim: true,
      maxlength: [
        50,
        "Зохиогчийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой.",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Рэйтинг хамгийн багадаа 1 байх ёстой"],
      max: [10, "Рэйтинг хамгийн ихдээ 10 байх ёстой"],
    },
    price: {
      type: Number,
      required: [true, "Номны үнийг оруулна уу"],
      min: [500, "Номын үнэ хамгийн багадаа 500 төгрөг байх ёстой"],
    },
    balance: Number,
    content: {
      type: String,
      required: [true, "Номын тайлбарыг оруулна уу"],
      trim: true,
      maxlength: [5000, "Номын нэрний урт дээд тал нь 20 тэмдэгт байх ёстой."],
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    available: [String],

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {toJSON:{virtuals:true}, toObject:{virtuals:true}}
);

BookSchema.virtual("zohiogch").get(function(){
  let tokens = this.author.split(" ");
  if(tokens.length === 1) tokens = this.author.split(".");
  if(tokens.length === 2) return tokens[1];
  return tokens[0];
})


module.exports = mongoose.model("Book", BookSchema);
