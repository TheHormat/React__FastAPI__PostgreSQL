interface Contact {
  id: number;
  username: string;
  email: string;
  message: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
}

function ContactList({ contacts, onDelete }: ContactListProps) {
  return (
    <div>
      <h2>Contact Lists</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.username}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>
                <i
                  onClick={() => onDelete(contact.id)}
                  className="fa-solid fa-trash"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;
