import Router from "express";
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/all").get(getAllPosts);
router.route("/:id").get(getPostById) ;
router.route("/update/:id").post(updatePostById) | router.route("/update/:id").put(updatePostById);
router.route("/delete/:id").delete(deletePostById) | router.route("/delete/:id").post(deletePostById);

export default router;