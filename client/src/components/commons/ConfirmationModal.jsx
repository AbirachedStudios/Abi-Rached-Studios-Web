"use client"
export default function ConfirmationModal({ onClose, title, message }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-30 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-headline-small text-center text-primary-100 mb-4">{title}</h2>
        <p className="text-title-small text-center text-primary-100 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-gold text-primary-0 text-headline-small rounded-md px-4 py-2 hover:bg-gold-dark transition-all w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
