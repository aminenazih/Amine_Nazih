"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const resource_routes_1 = require("./routes/resource.routes");
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Create DataSource for SQLite
const AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: ["src/entities/*.ts"], // Adjust path if needed
    synchronize: true,
    logging: true
});
// Initialize the database connection
AppDataSource.initialize().then(() => {
    console.log("Database connected successfully");
    // Setup routes
    app.use('/resources', resource_routes_1.ResourceRouter);
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Error during DataSource initialization", error);
});
