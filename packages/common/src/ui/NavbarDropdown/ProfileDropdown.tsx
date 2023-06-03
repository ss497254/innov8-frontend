import React, { useEffect, useRef, useState } from "react";
import { LogoutIcon } from "../../icons";
import { useUserStore } from "../../stores";
import Transition from "../Transition";
import { Avatar } from "../User";

export const ProfileDropdown = ({ children }: React.PropsWithChildren) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const { user, logout } = useUserStore();

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
        className="c hover:bg-dark-200 rounded-full transition duration-150"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <Avatar src={user!.avatarUrl} size={42} />
      </button>
      <Transition
        className="origin-top-right z-50 absolute top-full right-0 mr-1 bg-white border border-gray-300 rounded-xl drop-shadow-xl overflow-hidden mt-1"
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
          className="flex flex-col w-60 whitespace-nowrap overflow-ellipsis"
          onClick={() => {}}
        >
          <div className="p-4 rounded-t-md border-b">
            <h4>
              {user!.firstName} {user!.lastName}
            </h4>
            <div className="text-sm text-gray-600 uppercase font-normal">
              {user?.role}
            </div>
          </div>
          <div className="p-2 space-y-1">
            <div className="f ic d5 px-4 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer">
              Profile
            </div>
            <div className="f ic d5 px-4 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer">
              Settings
            </div>
            <div className="f ic d5 px-4 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer">
              Support
            </div>
          </div>
          <button
            className="f !ring-0 ic d5 space-x-3 py-3 px-6 rounded-b-md text-red-500 border-t hover:bg-red-500 hover:text-white"
            onClick={logout}
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default ProfileDropdown;
