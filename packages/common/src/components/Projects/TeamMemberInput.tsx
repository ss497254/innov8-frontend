import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { UserType } from "../../types";
import { SelectInput, Spinner } from "../../ui";
import { debounced } from "../../utils";

type props = Parameters<typeof SelectInput>[0];

interface TeamMemberInputProps extends Omit<props, "options" | "children"> {
  setValue: any;
}

export const TeamMemberInput: React.FC<TeamMemberInputProps> = ({
  ...props
}) => {
  const [user, setUser] = useState<UserType>();
  const [options, setOptions] = useState<React.ReactNode[]>([]);
  const { run, loading } = useApi<UserType>("GET", "/employee/team-member");

  const onChangeDebounced = debounced(
    async ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!value) return;

      const res = await run({
        parameter: `?email=` + value,
        body: undefined,
      });
      if (res && res.success) setUser(res.data);

      console.warn(res.error);
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
        <Spinner size={24} className="my-10 mx-auto" />
      ) : user ? (
        <button
          className="f w-full rounded p-1"
          onClick={() =>
            setOptions([
              ...options,
              <div className="f">
                <img
                  src={user.avatarUrl}
                  className="h-7 w-7 mx-3 rounded-full"
                />
                {user.firstName} {user.lastName}
              </div>,
            ])
          }
        >
          <img src={user.avatarUrl} className="h-7 w-7 mx-1 rounded-full" />
          {user.firstName} {user.lastName}
        </button>
      ) : (
        "No user found"
      )}
    </SelectInput>
  );
};
