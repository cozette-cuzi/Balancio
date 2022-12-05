import { CRUD } from "../../common/interfaces/crud.interface";
import categoriesDao from "../dao/categories.dao";
import { CreateCategoryDto } from "../dto/create.category.dto";
import { PutCategoryDto } from "../dto/put.category.dto";


class CategoriesService implements CRUD {
    async list(limit: number, page: number) {
        return categoriesDao.getCategories(limit, page);
    }

    async create(resource: CreateCategoryDto) {
        return categoriesDao.addCategory(resource);
    }

    async putById(id: string, resource: PutCategoryDto): Promise<any> {
        return categoriesDao.updateCategoryById(id, resource);
    }

    async readById(id: string) {
        return categoriesDao.getCategoryById(id);
    }

    async getCategoriesByUserId(userId: string) {
        return categoriesDao.getCategoriesByUserId(userId);
    }
    
    async deleteById(id: string) {
        return categoriesDao.removeCategoryById(id);
    }

    async patchById(id: string, resource: PutCategoryDto): Promise<any> {
        return categoriesDao.updateCategoryById(id, resource);
    }
}

export default new CategoriesService();