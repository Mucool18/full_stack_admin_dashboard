const Product = require("../models/product");
const ProductStat = require("../models/productStat");
const User = require("../models/user");
const Transaction = require("../models/transaction");
const getCountryIso3 = require("country-iso-2-to-3")

const getProducts = async (req, res) => {
    try {
        let query = req.query;
        console.log("query ==> ", query)
        const products = await Product.find(query);
        const productsWithStat = await Promise.all(
            products.map(async(product)=>{
                const stat = await ProductStat.find({
                    productId: product._id
                });
                return {
                    ...product._doc,
                    stat
                }
            })
        )
        res.status(200).json({success: true, message:"Products found successfully", data: productsWithStat})
    } catch (error) {
        res.status(404).json({success: false, message:"No product found"})
    }

}

const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({role:"user"}).select("-password");
        res.status(200).json({success: true, message:"Customers found successfully", data: customers})
    } catch (error) {
        res.status(404).json({success: false, message:"No product found"})
    }

}

const getTransactions = async (req, res) => {
    console.log("inside transactions")
    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {

      const sortParsed = JSON.parse(sort);
      if(sortParsed.field){
        const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };

        return sortFormatted;
      }else{
        return {}
      }

    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};
    console.log(sortFormatted, page, pageSize, sort, search)
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({});
        res.status(200).json({success: true, message:"Transaction found successfully", data:{transactions, total}})
    } catch (error) {
        console.log("Erroe ", error)
        res.status(404).json({success: false, message:"No product found"})
    }

}

const getGeography = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        const mappedUsers = users.reduce((acc, {country})=>{
            const countryIso3 = getCountryIso3(country);
            if(!acc[countryIso3]){
                acc[countryIso3] = 0;
            }
            acc[countryIso3] += 1
            return acc;
        },{});
        const formattedLocations = Object.entries(mappedUsers).map(([country, count])=>{
            return {id:country, value:count}
        })
        res.status(200).json({success: true, message:"Locations found successfully", data: formattedLocations})
    } catch (error) {
        res.status(404).json({success: false, message:"No product found"})
    }

}

module.exports = {
    getProducts,
    getCustomers,
    getTransactions,
    getGeography
}