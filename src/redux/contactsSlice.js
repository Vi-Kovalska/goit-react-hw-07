import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from "./contactsOps";
import toast from "react-hot-toast";
import { selectNameFilter } from "./filtersSlice";

const handlePending = (state) => {
  state.loading = true;
  state.error = false;
};
const handleRejected = (state, { payload }) => {
  state.loading = false;
  if (payload === "ABORTED") {
    state.error = null;
  } else {
    state.error = payload;
  }
};
const handleFulfilled = (state) => {
  state.loading = false;
  state.error = null;
};

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        handleFulfilled(state);
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        handleFulfilled(state);
        state.items.push(payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        handleFulfilled(state);
        state.items = state.items.filter((item) => item.id !== payload.id);
      })
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, { payload }) => {
        handleFulfilled(state);
        state.items = state.items.map((contact) =>
          contact.id === payload.id ? payload : contact
        );
      })
      .addCase(editContact.rejected, handleRejected);
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filterName) => {
    const visibleContacts = contacts.filter((cont) =>
      cont.name.toLowerCase().includes(filterName.toLowerCase())
    );
    if (visibleContacts.length === 0 && contacts.length !== 0)
      toast("Sorry, no match found.");
    return visibleContacts;
  }
);
export const contactsReducer = slice.reducer;
export const { stabilisationError } = slice.actions;
