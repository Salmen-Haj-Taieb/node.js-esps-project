const { Command } = require('../model/command')
const { Product } = require('../model/product')
const getAllCommands = async (req, res) => {
    try {
        const commands = await Command.find().populate(
            {
                path: 'userId',
                select: [
                    'firstName',
                    'lastName'
                ]
            }
        ).populate('products.product')
        return res.status(201).json({
            status: 201,
            data: commands
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: new Error(error)
        })
    }
}

const addCommand = async (req, res) => {
    try {
        console.log('req.body : ',req.body)
        const { products } = req.body
        console.log('products : ',products)
        console.log("******products length*********", products.length)
        if (products.length) {
            let numberValidated = 0
            let commandPrice = 0
            const listProducts = await Product.find({
                _id: { $in: products.map(el => el.product) },
            })
            console.log("*********listProducts*******", listProducts)
            for (let index = 0; index < listProducts.length; index++) {
                const element = listProducts[index];
                const indexElement = products.findIndex(el => el.product === element._id.toString())
                if (indexElement !== -1) {
                    if (products[indexElement].quantity <= element.stock) {
                        numberValidated++
                        commandPrice += products[indexElement].quantity * element.price
                    }
                } else {
                    break
                }
            }
            if (numberValidated === products.length) {
                const command = new Command({
                    products: products,
                    userId: req.user._id,
                    price: commandPrice,
                })
                command.save().then(async () => {
                    for (let index = 0; index < products.length; index++) {
                        await Product.findByIdAndUpdate(products[index].product, {
                            $inc: { stock: -products[index].quantity }
                        })
                    }
                }).then(() => {
                    res.status(201).json({
                        status: 201,
                        message: 'command created ! ',

                    })
                })
            } else {
                res.status(401).json({
                    status: 401,
                    message: 'product stock problem !'
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                message: 'check your data'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: new Error(error)
        })
    }
}

exports.addCommand = addCommand
exports.getAllCommands = getAllCommands