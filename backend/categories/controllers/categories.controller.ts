import debug from "debug";
import express from "express";
import categoriesService from "../services/categories.service";

const log: debug.IDebugger = debug('app:categories-controller');

class CategoriesController {
    async listCategories(req: express.Request, res: express.Response) {
        /* TODO: implement pagination */
        const categories = await categoriesService.list(100, 0); 
        res.status(200).send(categories);
    }

    async getCategoryById(req: express.Request, res: express.Response) {
        const category = await categoriesService.readById(req.params.categoryId);
        res.status(200).send(category);
    }

    async getCategoriesByUserId(req: express.Request, res: express.Response) {
        const categories = await categoriesService.getCategoriesByUserId(res.locals.jwt.userId);
        res.status(200).send(categories);
    }

    async createCategory(req: express.Request, res: express.Response) {
        req.body.userId = res.locals.jwt.userId;
        const categoryId = await categoriesService.create(req.body);
        res.status(201).send({ id: categoryId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await categoriesService.patchById(req.params.categoryId, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        log(await categoriesService.putById(req.params.categoryId, req.body));
        res.status(204).send();
    }

    async removeCategory(req: express.Request, res: express.Response) {
        log(await categoriesService.deleteById(req.params.categoryId));
        res.status(204).send();
    }
}

export default new CategoriesController();