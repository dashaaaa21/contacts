import { Link } from 'react-router-dom';

export default function Header({ searchBySymbols, userEmail, onLogout }) {
    return (
        <header className="w-full bg-black text-white">
            <div className="py-6 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

                <div className="flex items-center gap-3">
                    <img src="/logo.svg" alt="Logo" className="w-12" />
                    {userEmail && (
                        <div className="text-sm text-lime-200">
                            <div className="font-semibold">Hello!</div>
                            <div className="text-xs break-all">{userEmail}</div>
                        </div>
                    )}
                </div>

                <nav className="flex flex-wrap items-center gap-4 md:gap-10 text-gray-300 justify-center">
                    <Link to="/" className="text-white hover:text-white transition">Contact List</Link>
                    <Link to="/new-contact" className="hover:text-white transition">New Contact</Link>
                    <Link to="/update-contact" className="hover:text-white transition">Update Contact</Link>
                </nav>

                <div className="flex-1 flex justify-center md:justify-center px-0 md:px-4 gap-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full max-w-xs md:max-w-md px-4 py-2 rounded-full text-white outline-none ring-2 ring-lime-300"
                        onChange={(e) => searchBySymbols(e.target.value)}
                    />
                    <button
                        className="bg-lime-400 text-black px-4 py-2 rounded-full font-medium hover:bg-lime-300 transition"
                        onClick={() => console.log('Search button clicked')}
                    >
                        Search
                    </button>
                </div>

                <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
                    {userEmail ? (
                    <button
                            onClick={onLogout}
                            className="bg-red-500 text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-red-400 transition">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                        className="bg-lime-300 text-black px-4 md:px-6 py-2 rounded-full font-medium hover:bg-lime-200 transition">
                        Sign in
                            </Link>
                            <Link
                                to="/register"
                        className="bg-lime-900 text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-lime-600 transition">
                        Register
                            </Link>
                        </>
                    )}
                </div>

            </div>

            <div className="w-full h-px bg-white/20"></div>
        </header>
    );
}
