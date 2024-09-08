import mongoose from "mongoose"


const AltKategoriSchema = new mongoose.Schema({
  selectedFile: { type: String },
  adi: { type: String },
  fiyat: { type: Number },
  stok:{type:Number}
});


const PostSchema = new mongoose.Schema({
  selectedFile: { type: String },
  altKategoriler: [AltKategoriSchema]  
});


const Post = mongoose.model('Post', PostSchema);

export default Post
