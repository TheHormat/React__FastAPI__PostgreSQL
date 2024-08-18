import { useEffect, useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList";

interface Contact {
  id: number;
  username: string;
  email: string;
  message: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/contacts/");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error("An error occurred while retrieving data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleAddContact = async (newContact: Omit<Contact, "id">) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/contacts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        fetchContacts();
      } else {
        alert("Message could not be sent. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDeleteContact = async (id: number) => {
    const contactToDelete = contacts.find((contact) => contact.id === id);

    if (!contactToDelete) {
      alert("Contact not found!");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert(`${contactToDelete.username} named user successfully deleted!`);
        fetchContacts();
      } else {
        alert(
          `${contactToDelete.username} named user could not be deleted. Please try again.`
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="App">
      <div className="contact__form">
        <h2>Contact Form</h2>
        <form
          className="contact__form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newContact = {
              username: formData.get("name") as string,
              email: formData.get("email") as string,
              message: formData.get("message") as string,
            };
            handleAddContact(newContact);
            e.currentTarget.reset(); // clear form
          }}
        >
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea name="message" id="message" required />
          </div>
          <div className="button__container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div className="contact__list">
        <ContactList onDelete={handleDeleteContact} contacts={contacts} />
      </div>
    </div>
  );
}

export default App;
