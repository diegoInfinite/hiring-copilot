import { MessageTypeEnum } from '../enum/MessageTypeEnum';

type MessageModalProps = {
  open: boolean;
  type: MessageTypeEnum;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
};

const styleByType = {
  [MessageTypeEnum.ERROR]: {
    color: 'border-red-600',
    icon: '⚠️',
    defaultTitle: 'Error',
  },
  [MessageTypeEnum.SUCCESS]: {
    color: 'border-green-600',
    icon: '✅',
    defaultTitle: 'Éxito',
  },
  [MessageTypeEnum.WARNING]: {
    color: 'border-yellow-500',
    icon: '⚠️',
    defaultTitle: 'Advertencia',
  },
  [MessageTypeEnum.INFO]: {
    color: 'border-blue-600',
    icon: 'ℹ️',
    defaultTitle: 'Información',
  },
  [MessageTypeEnum.CONFIRM]: {
    color: 'border-gray-600',
    icon: '❓',
    defaultTitle: 'Confirmar acción',
  },
};

export function MessageModal({
  open,
  type,
  title,
  message,
  onClose,
  onConfirm,
}: MessageModalProps) {
  if (!open) return null;

  const config = styleByType[type];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className={`bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl border-t-4 ${config.color}`}>
        <div className="flex gap-3 mb-3">
          <span className="text-3xl">{config.icon}</span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {title || config.defaultTitle}
            </h2>
            <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
              {message}
            </p>
          </div>
        </div>

        <div
          className={`mt-5 flex gap-3 ${
            type === MessageTypeEnum.CONFIRM ? 'justify-end' : 'justify-center'
          }`}
        >
          {type === MessageTypeEnum.CONFIRM && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
            >
              Cancelar
            </button>
          )}

          <button
            onClick={() => {
              if (type === MessageTypeEnum.CONFIRM && onConfirm) onConfirm();
              if (type !== MessageTypeEnum.CONFIRM) onClose();
            }}
            className={`px-4 py-2 rounded-lg text-white text-sm font-medium 
              ${
                type === MessageTypeEnum.CONFIRM
                  ? 'bg-gray-700 hover:bg-gray-800'
                  : config.color.replace('border-', 'bg-')
              }`}
          >
            {type === MessageTypeEnum.CONFIRM ? 'Confirmar' : 'Aceptar'}
          </button>
        </div>
      </div>
    </div>
  );
}
