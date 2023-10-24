const { Product } = require('../model/product')

const addProduct = async (req, res, next) => {
    // var reg = new RegExp('^[0-9]$');
    // console.log("regex : ",reg.test(2.5));
    const { name, description, price, category, stock } = await req.body
    console.log("name  : ",name)
    if (name
        && description
        && price
        && category
        && stock
        && typeof price === "number"
        && typeof stock === "number") {
        const product = new Product({
            name: name,
            description: description,
            price: price,
            category: category,
            stock: stock
        }
        )
        product.save().then(() => {
            res.status(201).json({
                status: 201,
                message: 'product added successflly'
            })
        })
    } else {
        res.status(400).json({ status: 400, message: "invalid type" })
    }
}

const updateProduct = async (req, res, next) => {
    const { name, description, price, category, stock } = req.body
    if (name
        && description
        && price
        && category
        && stock
        && typeof price === "number"
        && typeof stock === "number") {
        Product.findByIdAndUpdate(req.query.productId, {
            name: name,
            description: description,
            price: price,
            category: category,
            stock: stock
        }).then(() => {
            res.status(201).json({
                status: 201,
                message: 'product updated successflly'
            })
        }).catch((error) => {
            res.status(500).json({ status: 500, message: error })
        })
    } else {
        res.status(400).json({ status: 400, message: "invalid type" })
    }
}

const getProduct = (req, res) => {
    Product.findById(req.query.productId).then((product) => {
        if (product) {
            res.status(201).json({
                status: 201,
                data: product
            })
        } else {
            res.status(401).json({
                status: 401,
                message: 'product not found !'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            status: 500,
            message: error
        })
    })
}

const getAllProducts = async (req, res, next) => {
    Product.find().then((products) => {
        res.status(201).json({
            status: 201,
            message: 'all products ',
            data: products
        })
    }).catch((error) => {
        res.status(400).json({ status: 400, error: error })
    })
}

const deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.query.productId).then((product) => {
        if (product) {
            res.status(201).json({
                status: 201,
                message: 'product deleted successflly',
                data: product
            })
        } else {
            res.status(401).json({
                status: 401,
                message: 'product not found !'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            status: 500,
            message: error
        })
    })
}

const deleteAllProducts = (req, res) => {
    Product.deleteMany().then((products) => {
        if (products) {
            res.status(201).json({
                status: 201,
                message: 'all products deleted successflly !',
                data: products
            })
        } else {
            res.status(401).json({
                status: 401,
                message: 'all products already deleted !'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            status: 500,
            message: error
        })
    })
}

const searchProdByName = (req,res)=>{
    console.log('req.body : ',req.body)
    const {word} = req.body
    console.log("word : ",word)
    Product.find({"name" : {$regex : word}}).then((product)=>{
        if(product){
            res.status(201).json({
                status : 201,
                data : product,
                message : 'products selected successflly :-)'
            })
        }else{
            res.status(401).json({
                status : 401,
                message : 'bad request :-('
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            status:500,
            message:error
        })
    })
}

exports.searchProdByName = searchProdByName
exports.getProduct = getProduct
exports.deleteAllProducts = deleteAllProducts
exports.deleteProduct = deleteProduct
exports.getAllProducts = getAllProducts
exports.updateProduct = updateProduct
exports.addProduct = addProduct