"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const api_1 = __importDefault(require("./api"));
router.use("/api", api_1.default);
// router.get("/hello/world", function (req, res) {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   res.send("Hello World!");
// });
// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    // Serve the frontend's index.html file at the root route
    router.get("/", (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        res.sendFile(path.resolve(__dirname, "../../frontend", "build", "index.html"));
    });
    // Serve the static assets in the frontend's build folder
    router.use(express_1.default.static(path.resolve("../frontend/build")));
    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        res.sendFile(path.resolve(__dirname, "../../frontend", "build", "index.html"));
    });
}
// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
    router.get("/api/csrf/restore", (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        res.status(201).json({});
    });
}
exports.default = router;
//# sourceMappingURL=index.js.map