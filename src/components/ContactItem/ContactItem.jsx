import { Link } from "react-router-dom";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";

export default function ContactItem({ stor, onDeleteContact }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-xs sm:text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">#</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Avatar</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">First Name</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Last Name</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {stor.map((contact, index) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                        <th scope="row" className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-900 font-medium">{index + 1}</th>

                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <img
                                src={`https://randomuser.me/api/portraits/${contact.gender === 'female' ? 'women' : 'men'}/${contact.avatar}.jpg`}
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </td>

                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-900">{contact.firstName}</td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-900">{contact.lastName}</td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-600">{contact.email}</td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-600">{contact.phone}</td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-600">{contact.status}</td>

                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <div className="flex gap-1 sm:gap-2">
                                <Link to={`/update-contact`}>
                                    <EditButton />
                                </Link>
                                <DeleteButton contactId={contact.id} onDelete={onDeleteContact} />
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}