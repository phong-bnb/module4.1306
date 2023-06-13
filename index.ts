import {AppDataSource} from "./src/data-source";
import {Product} from "./src/entity/Product";
import express from "express";
import bodyParser from 'body-parser';

const PORT = 3421;
AppDataSource.initialize().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    const ProductRepo = connection.getRepository(Product)
    app.post("/product/create", async (req, res) => {
        try {
            const ProductSearch = await ProductRepo.findOneBy({name: req.body.name})
            if (ProductSearch) {
                res.status(500).json({
                    message: "sản phẩn đã tồn tại"
                })
            }

            const ProductData = {
                name: req.body.name,
                avatar: req.body.avatar,
                author: req.body.author,
                price: req.body.price
            }
            const Product = await ProductRepo.save(ProductData)
            if (Product) {
                res.status(200).json({
                    mesage: "tạo sản phẩm thành công",
                    product: Product
                })
            }
        } catch (err) {
            res.status(500).json({

                message: err.message

            })
        }
    })
    app.put("/product/update", async (req, res) => {
        try {
            let productSearch = await ProductRepo.findOneBy({id:req.body.id})
            if (!productSearch){
                res.status(500).json({
                    message: "Sản phẩm không tồn tại"
                })
            }
            const product = await ProductRepo.update({id:req.body.id},req.body);
            res.status(200).json({
                message:"updated sản phẩm thành công"
            })
        } catch (err) {
            res.status(500).json({

                message: err.message

            })
        }
    })
    app.delete('/product/delete',async (req, res) => {
        try {
            let productSearch = await ProductRepo.findOneBy({id:req.body.id})
            if (!productSearch){
                res.status(500).json({
                    message : "không tìm thấy sản phẩm"
                })
                const product = await ProductRepo.delete({id:req.body.id})
                res.status(200).json({
                    message : "xóa sản phẩm thành công"
                })
            }
        }catch (err) {
            res.status(500).json({

                message: err.message

            })
        }
    })
    app.get("/product/list", async (req, res) => {
        try {
            const product = await ProductRepo.find()
            if (product){
                res.status(200).json({
                    message : "success",
                    product: product
                })
            }
        }catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })
    app.get("/product/detail", async (req, res) => {

        try {

            let productId = parseInt(req.query.productId as string);

            const product = await ProductRepo.findOneBy({ id: productId })

            if (product) {

                res.status(200).json({ message: "Sucess", product })

            }

        } catch (err) {

            res.status(500).json({ message: err.mesage })

        }

    });
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    });
})