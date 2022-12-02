import debug from "debug";
import mongooseService from "../../common/services/mongoose.service";
import { CreateCategoryDto } from "../dto/create.category.dto";
import { PatchCategoryDto } from "../dto/patch.category.dto";
import { PutCategoryDto } from "../dto/put.category.dto";
import { CategoryDocument } from "./category.document";


const log: debug.IDebugger = debug("app:category-dao");

class CategoryDao {
    Schema = mongooseService.getMongoose().Schema;
    mongoose = mongooseService.getMongoose();

    categorySchema = new this.Schema(
        {
            _id: String,
            name: String,
            color: String,
            userId: String
        },
        { id: false }
    );

    Category = this.mongoose.model<CategoryDocument>("Categories", this.categorySchema);
    constructor() {
        log("Created new instance of CategoryDao");
    }

    async addCategory(categoryFields: CreateCategoryDto) {
        const categoryId = new this.mongoose.Types.ObjectId();
        const category = new this.Category({
            _id: categoryId,
            ...categoryFields
        });
        category.save();
        return categoryId;
    }

    async getCategoryById(categoryId: String) {
        return this.Category.findOne({ _id: categoryId }).exec();
    }

    async getCategoriesByUserId(userId: String, limit = 25, page = 0) {
        return this.Category.find({ userId: userId })
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getCategories(limit = 25, page = 0) {
        return this.Category.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async updateCategoryById(categoryId: String, categoryFields: PatchCategoryDto | PutCategoryDto) {
        return this.Category.findOneAndUpdate(
            { _id: categoryId },
            { $set: categoryFields },
            { new: true }
        ).exec();
    }

    async removeCategoryById(categoryId: string) {
        return this.Category.deleteOne({ _id: categoryId }).exec();
    }

}
export default new CategoryDao();