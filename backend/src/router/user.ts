import { Context, Hono } from "hono";
import {
  handleGetPostById,
  handlePostDeleteById,
  handlePostPostreq,
  handlePutById,
  handleSigninPostreq,
  handleSignupPostreq,
  handlegetPosts,
  handlegetMainUserPosts,
  handlegetUserById,
  handlegetAllUsers,
  handlePostsByTags,
  handleGetTags,
} from "../controller/user";
import { authmiddleware } from "../middleware/user";

export const router = new Hono();

router.post("/signup", handleSignupPostreq);//
router.post("/signin", handleSigninPostreq);//
router.get("/all-posts", handlegetPosts);//
router.get("/posts", authmiddleware, handlegetMainUserPosts);//
router.post("/create-post", authmiddleware, handlePostPostreq);
router.get("/post/:id", authmiddleware, handleGetPostById);
router.put("/post/:id", authmiddleware, handlePutById);
router.delete("/post/:id", authmiddleware, handlePostDeleteById);
router.get("/getuser/:id", authmiddleware, handlegetUserById);//
router.get("/users", authmiddleware, handlegetAllUsers)
router.get("/getPost/:tag", handlePostsByTags);//
router.get("/tags", handleGetTags)//
