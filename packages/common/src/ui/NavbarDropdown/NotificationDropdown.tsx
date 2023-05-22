import React, { useState, useRef, useEffect } from "react";
import Transition from "../Transition";
import { NotificationIcon } from "../../icons";

interface NotificationDropdownProps extends React.PropsWithChildren {}

export const NotificationDropdown: React.FC<
  NotificationDropdownProps
> = ({}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (
        !dropdownOpen ||
        !dropdown.current ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode = 0 }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="r">
      <button
        ref={trigger}
        className="c bg-dark-200 rounded-full p-1.5 hover:bg-dark-300 transition duration-150"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <NotificationIcon size={20} />
        <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></div>
      </button>

      <Transition
        className="origin-top-right z-100 absolute top-full right-0 mr-1 w-96 outline outline-[1px] outline-slate-400
                rounded-lg shadow-xl overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="font-semibold text-white bg-sky-500 py-3 px-4">
            Notification
          </div>
          <ul>
            <li className="border-t border-slate-200 p-3">
              <div className="mb-2">
                📣 Sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim.
              </div>
              <div className="text-xs text-slate-600">Feb 12, 2024</div>
            </li>
          </ul>
          <div className="font-semibold text-blue-600 border-t border-gray-300 py-2 px-4">
            See More
          </div>
        </div>
      </Transition>
    </div>
  );
};
