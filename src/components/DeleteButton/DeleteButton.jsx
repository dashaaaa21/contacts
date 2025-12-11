export default function DeleteButton({ contactId, onDelete }) {
    const handleDelete = () => {
        if (window.confirm('You sure?')) {
            onDelete(contactId);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
        >
            Delete
        </button>
    );
}