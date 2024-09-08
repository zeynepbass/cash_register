import express from "express"
import { getPosts} from "../controllers/post.js"

const router=express.Router()

router.get('/panel',getPosts);

export default router;