type ConfirmModalProps = {
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({ onClose, onConfirm, message }: ConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 w-96 shadow-xl animate-fadeIn">
        
        <p className="text-lg mb-6 text-slate-200">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}