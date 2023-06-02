import { useApi } from "common/src/hooks/useApi";
import { CloseIcon } from "common/src/icons";
import { UserType } from "common/src/types";
import { IconButton, sizes, Spinner } from "common/src/ui";
import { Avatar } from "common/src/ui/User";
import { debounced } from "common/src/utils";
import React, { useId, useState } from "react";

interface AssignCoachProps {
  onChange: (x: UserType | undefined) => void;
  value?: UserType;
  size?: keyof typeof sizes;
}

export const AssignCoach: React.FC<AssignCoachProps> = ({
  value,
  onChange,
  size = "md",
}) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<UserType>();
  const { run, loading } = useApi<UserType>("GET", "/admin/coach-details");

  const onChangeDebounced = debounced(
    async ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!value) {
        setUser(undefined);
        return;
      }

      const res = await run({
        parameter: `?email=` + value,
      });

      if (res && res.success) setUser(res.data);
      else setUser(undefined);
    },
    1000
  );

  return (
    <div className="r">
      <label
        htmlFor={id}
        className="block mb-1 text-xl font-semibold text-gray-900"
      >
        Assign Coach
      </label>
      <p className="mb-1">Coach email</p>
      <div
        className="r bg-gray-50 border rounded-md border-gray-300 text-gray-900 focus:outline-2 focus:outline-blue-500"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(setOpen, 500, false)}
      >
        <input
          type="email"
          className={["r outline-none w-full", sizes[size]].join(" ")}
          onChange={onChangeDebounced}
        />
        {value && (
          <div className="absolute inset-0.5 f ic px-1 bg-gray-50">
            <Avatar src={value.avatarUrl} size={24} className="mx-2" />
            {value.firstName} {value.lastName}
            <IconButton
              className="!p-1 ml-auto"
              onClick={() => onChange(undefined)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </div>
      <div
        className={`absolute z-10 inset-x-0 shadow-lg top-[105%] p-2 d10 transition-all b rounded-md bg-gray-50 border-dark-300 ${
          open ? "" : "hidden"
        }`}
      >
        {loading ? (
          <Spinner size={24} className="my-10 mx-auto text-gray-800" />
        ) : user ? (
          <button
            onClick={() => {
              setOpen(false);
              onChange(user);
            }}
            className="f w-full rounded p-1 ic hover:bg-gray-200 text-lg"
          >
            <div className="f mr-2 ic">
              <Avatar src={user.avatarUrl} size={24} className="mx-2" />
              {user.firstName} {user.lastName}
            </div>
          </button>
        ) : (
          "No user found"
        )}
      </div>
    </div>
  );
};
