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
exports.ResourceRouter = void 0;
const express_1 = require("express");
const resource_service_1 = require("../services/resource.service");
const router = (0, express_1.Router)();
exports.ResourceRouter = router;
const resourceService = new resource_service_1.ResourceService();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resourceService.create(req.body);
        res.status(201).json(resource);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield resourceService.findAll();
        res.status(200).json(resources);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resourceService.findOne(parseInt(req.params.id, 10));
        if (resource) {
            res.status(200).json(resource);
        }
        else {
            res.status(404).json({ message: 'Resource not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resourceService.update(parseInt(req.params.id, 10), req.body);
        if (resource) {
            res.status(200).json(resource);
        }
        else {
            res.status(404).json({ message: 'Resource not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield resourceService.delete(parseInt(req.params.id, 10));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
