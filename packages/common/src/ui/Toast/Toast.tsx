import { memo } from "react";
import { CloseIcon, HelpIcon, TickIcon, WarningIcon } from "../../icons";

const STACKING_OVERLAP = 0.9;
const notification_types = {
  success: <TickIcon size={26} />,
  error: <WarningIcon size={20} />,
  info: <HelpIcon size={22} />,
  warning: <WarningIcon size={20} />,
};

export interface ToastProps {
  id: number;
  index: number;
  total: number;
  message: string;
  type: keyof typeof notification_types;
  desc?: string;
  remove: (id: number) => void;
}

export const Toast = memo(
  ({ id, message, desc, type, index, total, remove }: ToastProps) => {
    const icon = notification_types[type];
    const inverseIndex = total - index - 1;
    const scale = 1 - inverseIndex * 0.06;
    const opacity = 100 - (inverseIndex / total) * 50;
    const y = inverseIndex * 100 * STACKING_OVERLAP;

    return (
      <div
        className="toast"
        style={
          {
            "--scale": scale,
            "--y": `${y}%`,
            "--opacity": `${opacity}%`,
          } as any
        }
      >
        <div className={["toast-inner", type].join(" ")}>
          <div className={["icon", type].join(" ")}>{icon}</div>
          <div className="toast-content">
            <h4>{message}</h4>
            <p>{desc}</p>
          </div>
          <button
            className="outline-none close ring-0"
            onClick={() => remove(id)}
          >
            <CloseIcon size={18} />
          </button>
        </div>
      </div>
    );
  }
);
