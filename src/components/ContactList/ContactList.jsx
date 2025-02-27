import React from 'react'
import s from './ContactList.module.css'
import Contact from '../Contact/Contact'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectContacts, selectFilteredContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';

const ContactList = () => {
  const visibleContacts = useSelector(selectFilteredContacts);
  return (
    <ul className={s.contactsList}>
      {(visibleContacts ?? contacts).map(cont => <li key={cont.id}><Contact data={cont} className={s.itemContact} /></li>)}
    </ul>
  )
}

export default ContactList