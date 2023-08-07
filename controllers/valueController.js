import asyncHandler from "express-async-handler";
import Value from "../models/valueModel.js";

// @desc Create a data
// ROUTE POST /api/data
// Access Private
const createContact = asyncHandler(async (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    res.status(400);
    throw new Error("All Fields are Mandatary");
  }
  const values = await Value.create({ key, value, user_id: req.user.id });
  res.status(201).json({
    status: "success",
    message: "Data stored successfully.",
    data: values,
  });
});

// @desc Get a data of particular id
// ROUTE GET /api/data/:id
// Access Private
const getContact = asyncHandler(async (req, res) => {
  const value = await Value.findById(req.params.id);
  if (!value) {
    res.status(404);
    throw new Error("Not_Found");
  }
  res.status(200).json({ status: "success", data: value });
});

// @desc Update a data of particular id
// ROUTE PUT /api/data/:id
// Access Private
const updateContact = asyncHandler(async (req, res) => {
  const value = await Value.findById(req.params.id);
  if (!value) {
    res.status(404);
    throw new Error("ID_Not_Found");
  }

  if (value.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to update other user contacts");
  }
  const updateValue = await Value.findById(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    message: "Data updated successfully.",
  });
});

// @desc Delete a data of particular id
// ROUTE DELETE /api/data/:id
// Access Private
const deleteContact = asyncHandler(async (req, res) => {
  const value = await Value.findById(req.params.id);
  if (!value) {
    res.status(404);
    throw new Error("ID_Not_Found");
  }
  const deleteValue = await Value.findByIdAndRemove(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Data deleted successfully.",
  });
});

export { createContact, getContact, updateContact, deleteContact };
