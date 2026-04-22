const router = require("express").Router();
const {
  createItem,
  getItems,
  searchItems,
  deleteItem,
  markAsClaimed,
  markAsResolved,
  revertItem,
} = require("../controllers/itemController");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", auth, upload.single("image"), createItem);

router.get("/", getItems);
router.get("/search", searchItems);
router.delete("/:id", deleteItem);
router.post("/claim", auth, markAsClaimed);
router.put("/resolve/:id", markAsResolved);
router.put("/revert/:id", revertItem);

module.exports = router;
