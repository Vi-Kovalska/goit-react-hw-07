import { useEffect } from 'react';
import './App.css'
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import { useDispatch, useSelector} from "react-redux";
import { addContact, fetchContacts  } from '../redux/contactsOps';
import { selectContacts, selectError, selectLoading} from '../redux/contactsSlice';
import toast from 'react-hot-toast';

function App() {
  const items = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchContacts({ signal: abortController.signal }));

    return () => {
      abortController.abort();
    }
  }, [dispatch])

  const handleSubmit = (values, actions) => {
       const uniqueName = items.every(
          (cont) => cont.name.toLowerCase() !== values.name.toLowerCase()
        );
        const uniqueTel = items.every(
          (cont) => String(cont.number) !== String(values.number)
        );
          if (!uniqueTel) return toast.error("This number is already added to contacts");
          if (!uniqueName) return toast.error("This name is already added to contacts");
        
    const newObj = {
      ...values
    }
    dispatch(addContact(newObj))
    actions.resetForm();
  }
  return (
    <>
        <h1>Phonebook</h1>
      <ContactForm btnName={'Add contact'} handleSubmit={handleSubmit} />
      <SearchBox />
      {loading && <p>Loading contacts...</p>}
      {error && error !== "ABORTED" && <p>Sorry...Error: {error}</p>}
      {items.length >= 1 && <ContactList/>}
      {(!loading && items.length === 0) && <p>The contact sheet is empty. Add your first contact in the form.</p>}
    </>
  )
}

export default App
