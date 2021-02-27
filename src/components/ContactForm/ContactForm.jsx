import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContacts } from "../../redux/selectors";
import styles from "./ContactForm.module.css";
import * as operations from "../../redux/operations";

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const onSubmit = (name, number) =>
    dispatch(operations.addContact(name, number));

  const newContact = () => {
    const includeName = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      []
    );
    const includeNumber = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      []
    );
    if (name === "" || number === "") {
      alert("Please enter all fields!");
      return true;
    }
    if (includeName.includes(name)) {
      alert(`${name} is already in contacts`);
      return true;
    } else if (includeNumber.includes(number)) {
      alert(`${number} is already in contacts`);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetName();
    resetNumber();
    if (newContact()) {
      return;
    }
    onSubmit(name, number);
  };

  const handleChangeName = (e) => {
    setName(e.currentTarget.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.currentTarget.value);
  };

  const resetName = () => {
    setName("");
  };

  const resetNumber = () => {
    setNumber("");
  };

  return (
    <form className={styles.form_block} onSubmit={handleSubmit}>
      <label className={styles.form_title}>
        Name
        <input
          className={styles.form_input}
          type="text"
          name="name"
          value={name}
          placeholder="Name Surname"
          onChange={handleChangeName}
        />
      </label>
      <label className={styles.form_title}>
        Number
        <input
          className={styles.form_input}
          type="text"
          name="number"
          value={number}
          onChange={handleChangeNumber}
          placeholder="000-00-00"
        />
      </label>
      <button className={styles.form_button} type="submit">
        Add contact
      </button>
    </form>
  );
}
