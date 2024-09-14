"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const data_source_1 = require("../data-source"); // Correct the path
const Resource_1 = require("../entities/Resource");
class ResourceService {
    constructor() {
        this.resourceRepository = data_source_1.AppDataSource.getRepository(Resource_1.Resource);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = this.resourceRepository.create(data);
            return yield this.resourceRepository.save(resource);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.resourceRepository.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = yield this.resourceRepository.findOne({ where: { id } });
            return resource || undefined;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.resourceRepository.update(id, data);
            const updatedResource = yield this.resourceRepository.findOne({ where: { id } });
            return updatedResource !== null && updatedResource !== void 0 ? updatedResource : undefined;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.resourceRepository.delete(id);
        });
    }
}
exports.ResourceService = ResourceService;
