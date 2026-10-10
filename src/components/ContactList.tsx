import { Contact } from '../lib/api';

interface Props {
  contacts: Contact[];
}

export default function ContactList({ contacts }: Props) {
  if (contacts.length === 0) {
    return <p className="text-sm text-slate-400">No contacts yet.</p>;
  }
  return (
    <section>
      <h2 className="mb-3 text-lg font-medium">Contacts</h2>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Stage</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.company}</td>
                <td className="px-4 py-3 text-slate-500">{c.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize">{c.stage}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
