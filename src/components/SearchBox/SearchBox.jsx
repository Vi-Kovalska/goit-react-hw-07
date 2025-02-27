import React, { useId } from 'react'
import s from './SearchBox.module.css'
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
const SearchBox = () => {
  const id = useId();
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const contacts = useSelector(selectContacts);
  return (
    <div className={s.wrapper}>
    <label htmlFor={id}>Find contacts by name</label>
      <input id={id} type="text" name='nameContact' onChange={(e) => dispatch(changeFilter((e.target.value).trim()))} value={filter} className={s.input} readOnly={contacts.length === 0} />
    </div>

  )
}

export default SearchBox