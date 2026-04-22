const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  const normalized = (
    req.body.title +
    " " +
    req.body.description +
    " " +
    req.body.location
  )
    .replace(/\s+/g, "")
    .toLowerCase();

  const itemData = {
    ...req.body,
    user: req.user.id,
    image: req.file ? req.file.path : "",
    searchText: normalized,
  };

  const item = await Item.create(itemData);
  res.json(item);
};

exports.getItems = async (req, res) => {
  const statuses = req.query.status;

  let filter = {};

  if (statuses) {
    const statusArray = statuses.split(",");
    filter.status = { $in: statusArray };
  } else {
    filter.status = "active";
  }

  const items = await Item.find(filter).populate("user", "_id");

  res.json(items);
};

exports.searchItems = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) return res.json([]);

    const normalizedQuery = query.replace(/\s+/g, "").toLowerCase();

    const items = await Item.find({
      searchText: { $regex: normalizedQuery, $options: "i" },
    }).populate("user", "_id");

    res.json(items);
  } catch (err) {
    res.status(500).json("Search error");
  }
};

exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};

exports.markAsResolved = async (req, res) => {
  const { id } = req.params;

  await Item.findByIdAndUpdate(id, { status: "resolved" });

  res.json("Item marked as resolved");
};

exports.markAsClaimed = async (req, res) => {
  try {
    const { lostId } = req.body;

    const item = await Item.findById(lostId);

    if (!item) {
      return res.status(404).json("Item not found");
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json("Not allowed");
    }

    item.status = "claimed";
    await item.save();

    res.json("Item marked as claimed");
  } catch (err) {
    res.status(500).json("Error claiming item");
  }
};

exports.revertItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json("Item not found");
    }

    item.status = "active";
    await item.save();

    res.json("Item reverted to active");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error reverting item");
  }
};
