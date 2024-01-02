const asyncHandlerWrapper = require("express-async-handler");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Stock = require("../models/Stock");
const getAllProducts = asyncHandlerWrapper(async (req, res, next) => {
  res.status(200).json(res.queryResults);
});
const getAllProductsBySupplier = asyncHandlerWrapper(async (req, res, next) => {
  // const products = await Product.find({supplier: req.user.id}).populate("stocks", "size color piece price");

  // res.status(200)
  // .json({
  //     data: products
  // })
  res.status(200).json(res.queryResults);
});
const getProductsByCategory = asyncHandlerWrapper(async (req, res, next) => {
  let sort = "-createdAt";
  let products = [];
  let aggregate = [{ $match: { categories: req.categoryId } }];
  if (req.query.color) {
    aggregate.push(
      { $unwind: "$stocks" },
      {
        $lookup: {
          from: "stocks",
          foreignField: "_id",
          localField: "stocks",
          as: "stocks",
        },
      },
      { $match: { "stocks.color": req.query.color } }
    );
  }
  if (req.query.min) {
    aggregate.push(
      { $match: { price: { $gte: parseInt(req.query.min) } } },
      { $match: { price: { $lte: parseInt(req.query.max) } } }
    );
  }
  if (req.query.sortBy) {
    const sortKey = req.query.sortBy;
    if (sortKey === "newest") {
      sort = "-createdAt"; //- büyükten güçüğe
    }

    if (sortKey === "oldest") {
      sort = "createdAt";
    }

    if (sortKey === "cheap") {
      sort = "price";
    }
    if (sortKey === "expensive") {
      sort = "-price";
    }
    if (sortKey === "most") {
      sort = "-totalLikeCount";
    }
    if (sortKey === "least") {
      sort = "totalLikeCount";
    }
  }
  products = await Product.aggregate(aggregate).sort(sort).exec();

  res.status(200).json({
    success: true,
    data: products,
  });
  // res.status(200).json(res.queryResults)
});
const getProductById = asyncHandlerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate([
    { path: "supplier", select: "shopName email phone" },
    {
      path: "categories",
      select: "name slug properties",
      populate: { path: "properties", select: "property" },
    },
    { path: "stocks", select: "size color piece price type" },
    {
      path: "comments",
      select: "comment createdAt customer totalLikeCount",
      populate: { path: "customer", select: "name surname" },
    },
  ]);
  res.status(200).json({
    success: true,
    data: product,
  });
});
const addProduct = async (req, res, next) => {
  const product = await Product.create({
    supplier: req.user.id,

    ...req.body,
  });

  // product.save();
  res.status(200).json({
    success: true,
    data: product,
  });
};

const updateProductById = asyncHandlerWrapper(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndUpdate(
    productId,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    data: product,
  });
});

const deleteProductById = asyncHandlerWrapper(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  product.remove();
  res.status(200).json({
    message: "başarılı",
  });
});
const deleteAllProduct = asyncHandlerWrapper(async (req, res, next) => {
  await Product.deleteMany();
  await Stock.deleteMany();
  res.status(200).json({
    message: "başarılı",
  });
});

module.exports = {
  getAllProducts,
  addProduct,
  updateProductById,
  deleteAllProduct,
  deleteProductById,
  getAllProductsBySupplier,
  getProductsByCategory,
  getProductById,
};
