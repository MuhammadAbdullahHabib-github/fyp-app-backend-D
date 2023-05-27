const express = require('express');
const router = express.Router();
const Admin = require('../models/fyp-models');


// @route   POST api/admin
// @desc    Create a new admin 
router.post(
  "/",
  async (req, res) => {
    const { name ,email,password,role } = req.body;

    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ msg: "Admin already exists" });
      }
      admin = new Admin({
        name,
        email,
        password,
        role,
      });
      await admin.save();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  }
);

// @route   GET api/admin
// @desc    Get all admin details

router.get("/", async (req, res) => {
    try {
      let admin = await Admin.findMany().select("-password");
      res.send(admin);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  });


// @route   GET api/admin/id
// @desc    Get a single admin details based on id
router.get("/:id", async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }
      res.json(admin); // Respond with the retrieved admin object
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  });
  

// @route   PUT api/admin/:id
// @desc    Update an admin by ID
router.put("/:id", async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      let admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }
  
      admin.name = name;
      admin.email = email;
      admin.password = password;
      admin.role = role;
  
      await admin.save();
  
      res.json(admin); 
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  });

// @route   DELETE api/admin/:id
// @desc    Delete an admin by ID
router.delete("/:id", async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }
  
      await admin.remove();
  
      res.json({ msg: "Admin deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  });
  
  
// @route   PUT api/admin/:id
// @desc    Update an administrator role by ID
router.put("/:id", async (req, res) => {
    const { role } = req.body;
  
    try {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }
  
      admin.role = role;
  
      await admin.save();
  
      res.json(admin); 
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  });
  