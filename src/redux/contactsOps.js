import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://67c01d0eb9d02a9f224861a3.mockapi.io/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async ({ signal }, thunkAPI) => {
    try {
      const response = await axios.get("contacts", { signal });
      return response.data;
    } catch (error) {
      if (error.name === "CanceledError") {
        return thunkAPI.rejectWithValue("ABORTED");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post("contacts", { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`contacts/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ id, name, number }, thunkAPI) => {
    try {
      const response = axios.put(`contacts/${id}`, { name, number });
      return (await response).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
