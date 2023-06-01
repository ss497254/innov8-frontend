import React, { useRef, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useUserStore } from "../../stores";
import { UserType } from "../../types";
import { SelectInput, Spinner } from "../../ui";
import { debounced } from "../../utils";

type props = Parameters<typeof SelectInput>[0];

interface TeamMemberInputProps
  extends Omit<props, "options" | "children" | "onChange" | "value"> {
  onChange: (x: UserType[]) => void;
  value?: UserType[];
}

export const TeamMemberInput: React.FC<TeamMemberInputProps> = ({
  value = [],
  onChange,
  ...props
}) => {
  const users = useRef<UserType[]>(value);
  const [options, setOptions] = useState<React.ReactNode[]>(() => {
    onChange(value);

    return value.map((user) => (
      <div className="f mr-2 ic">
        <img src={user!.avatarUrl} className="h-7 w-7 mx-1 rounded-full" />
        {user!.firstName} {user!.lastName}
      </div>
    ));
  });

  const [user, setUser] = useState<UserType>();
  const { run, loading } = useApi<UserType>("GET", "/employee/team-member");

  const onChangeDebounced = debounced(
    async ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!value) return;

      const res = await run({
        parameter: `?email=` + value,
        body: undefined,
      });

      if (res && res.success) setUser(res.data);
    },
    1000
  );

  return (
    <SelectInput
      {...props}
      type="email"
      onChange={onChangeDebounced}
      options={options}
    >
      {loading ? (
        <Spinner size={24} className="my-10 mx-auto text-gray-800" />
      ) : user ? (
        <button
          className="f w-full rounded p-1 ic hover:bg-gray-200 text-lg"
          onClick={() => {
            if (!users.current.findIndex((value) => value.id === user.id)) {
              setUser(undefined);
              return;
            }

            users.current.push(user);
            setOptions([
              ...options,
              <div className="f mr-2 ic">
                <img
                  src={user.avatarUrl}
                  className="h-7 w-7 mx-1 rounded-full"
                />
                {user.firstName} {user.lastName}
              </div>,
            ]);
            setUser(undefined);
            onChange(users.current);
          }}
        >
          <img src={user.avatarUrl} className="h-6 w-6 mx-2 rounded-full" />
          {user.firstName} {user.lastName}
        </button>
      ) : (
        "No user found"
      )}
    </SelectInput>
  );
};
