import { Router} from "express";
import user from "./user.controller";
import product from "./product.controller";
import wishList from "./wish-list.controller";



const router = Router();

// Define your routes here
router.use("/user", user);
router.use("/wishlist", wishList);
router.use("/product", product);
export default router;