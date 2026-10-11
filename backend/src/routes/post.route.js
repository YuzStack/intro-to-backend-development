import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../controllers/post.controller.js';

const postRouter = Router();

postRouter.route('/create').post(createPost);
postRouter.route('/all').get(getPosts);
postRouter.route('/edit/:id').patch(updatePost);
postRouter.route('/delete/:id').delete(deletePost);

export default postRouter;
