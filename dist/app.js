"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const db = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "classicmodels",
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.json("Hello this is the server");
});
//--------------READ----------------------
// GET REQUEST FOR ALL THE CUSTOMER INFO
app.get("/customers", (req, res) => {
    const q = "SELECT * FROM `customers`;";
    db.query(q, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
//--------------CREATE----------------------
// POST REQUEST TO ADD A NEW CUSTOMER
app.post("/customers/create", (req, res) => {
    const customer = req.body;
    if (!customer.customerNumber) {
        return res.status(400).json({ error: "customerNumber is required" });
    }
    let salesRepEmployeeNumber = customer.salesRepEmployeeNumber || null;
    const q = "INSERT INTO customers (customerNumber,customerName,contactLastName,contactFirstName,phone,addressLine1,addressLine2,city,state,postalCode,country,salesRepEmployeeNumber,creditLimit) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const data = [
        customer.customerNumber,
        customer.customerName,
        customer.contactLastName,
        customer.contactFirstName,
        customer.phone,
        customer.addressLine1,
        customer.addressLine2,
        customer.city,
        customer.state,
        customer.postalCode,
        customer.country,
        salesRepEmployeeNumber,
        customer.creditLimit,
    ];
});
//--------------UPDATE----------------------
//PUT REQUEST TO UPDATE COSTUMER ADDRESSLINE1
app.put("/customers/update/:customerNumber", (req, res) => {
    const customerNumber = req.params.customerNumber;
    const customer = req.body;
    const q = 'UPDATE customers SET addressLine1= "1608 PR" WHERE customerNumber =?';
    const data = customerNumber;
    db.query(q, data, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
//--------------DELETE----------------------
//DELETE REQUEST TO DELETE AN ACCOUNT
app.delete("/customers/delete/:id", (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM customers WHERE customerNumber = ?";
    db.query(q, [id], (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
//SETTING THE SERVER
app.listen(7000, () => {
    console.log("Connected to server");
});
