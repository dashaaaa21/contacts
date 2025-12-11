
import ContactItem from "../../components/ContactItem/ContactItem";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

export default function ContactList({ stor, onDeleteContact }) {
    return (
        <main className="relative w-full min-h-screen bg-white flex flex-col lg:flex-row">
            <div className="hidden lg:flex w-12 bg-white border-r-2 border-gray-300 items-center justify-center">
                <div className="transform -rotate-90 whitespace-nowrap">
                    <span className="text-xs font-semibold tracking-widest text-gray-400">CONTACT LIST</span>
                </div>
            </div>

            <div className="w-full lg:w-1/3 p-6 sm:p-8 lg:p-12 flex flex-col justify-start border-b-2 lg:border-b-0 lg:border-r-2 border-gray-300">

                <Sidebar stor={stor} />

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6 lg:mb-8 leading-tight">
                    MY CONTACT LIST
                </h1>

                <div className="flex items-center gap-2 mb-4 sm:mb-8">
                    <img src="/listcontacts.svg" alt="Logo" className="w-15 sm:w-30 lg:20" />
                </div>

                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    <div className="border-l-4 border-lime-400 pl-3 sm:pl-4">
                        <h2 className="text-xs sm:text-sm font-bold text-black mb-1 sm:mb-2 uppercase tracking-wide">You can edit</h2>
                        <p className="text-xs text-gray-700 leading-relaxed">
                            Quickly change or correct contact details anytime.
                        </p>
                    </div>

                    <div className="border-l-4 border-lime-400 pl-3 sm:pl-4">
                        <h2 className="text-xs sm:text-sm font-bold text-black mb-1 sm:mb-2 uppercase tracking-wide">You can update</h2>
                        <p className="text-xs text-gray-700 leading-relaxed">
                            Keep the list fresh by adding new information or adjusting existing records.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-6 sm:mb-8 leading-tight">
                    My Contacts ({stor.length})
                </h1>
                <ContactItem stor={stor} onDeleteContact={onDeleteContact} />
            </div>

            <div className="hidden lg:flex w-16 bg-white border-l-2 border-gray-300 items-center justify-center">
                <div className="transform rotate-90 whitespace-nowrap">
                    <span className="text-xs font-semibold tracking-widest text-gray-400">BY DARIA TKACHENKO</span>
                </div>
            </div>
        </main>
    );
}