import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/operations";
import { getVisibleContacts } from "../../redux/selectors";
import React from "react";
import styles from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();
  const onDeleteContact = (id) => dispatch(deleteContact(id));

  return (
    <div className={styles.contacts_section}>
      <ul className={styles.contact_list}>
        {contacts.map(({ name, number, id }) => (
          <li className={styles.list_item} key={id}>
            {`${name} : ${number}`}
            {
              <button
                className={styles.list_button}
                type="button"
                name="delete"
                onClick={() => onDeleteContact(id)}
              >
                delete
              </button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
