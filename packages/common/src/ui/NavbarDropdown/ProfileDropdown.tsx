import React, { useEffect, useRef, useState } from "react";
import { LogoutIcon } from "../../icons";

import Transition from "../Transition";

export const ProfileDropdown = ({ children }: React.PropsWithChildren) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (
        !dropdownOpen ||
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
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
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
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {children}
      </button>

      <Transition
        className="origin-top-right z-100 absolute top-full right-0 mr-1 bg-white border border-gray-300 rounded-xl drop-shadow-xl overflow-hidden mt-1"
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
          className="flex flex-col w-60 whitespace-nowrap overflow-ellipsis p-2 gap-2"
          onClick={() => {}}
        >
          <div className="f ic gap-3 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer">
            <span>Settings</span>
          </div>
          <div className="f ic gap-3 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer">
            <span>Dark Mode</span>
          </div>
          <div className="f ic gap-3 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer">
            <span>Report a bug</span>
          </div>
          <div className="f ic gap-3 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer">
            <span>Help</span>
          </div>
          <div className="f ic gap-3 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 cursor-pointer">
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ProfileDropdown;
