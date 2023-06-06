import { ProjectType, ResponseType } from "common/src/types";
import { sizes, Spinner } from "common/src/ui";
import React, { useId, useState } from "react";
import useSWR from "swr";

interface ProjectNameInputProps {
  onChange: (x: ProjectType | undefined) => void;
  value?: ProjectType;
  size?: keyof typeof sizes;
}

export const ProjectNameInput: React.FC<ProjectNameInputProps> = ({
  value,
  onChange,
  size = "md",
}) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  const {
    data: res,
    isLoading,
    error,
  } = useSWR<ResponseType<ProjectType[]>>("/employee/hypotheses/projects");

  return (
    <div className="r">
      <label
        htmlFor={id}
        className="block mb-1 text-2xl font-bold text-gray-900"
      >
        Choose project
      </label>
      <p className="mb-1 font-semibold">Project Name</p>
      <div
        className="r bg-gray-50 border rounded-md border-gray-300 text-gray-900 focus:outline-2 focus:outline-blue-500"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(setOpen, 500, false)}
      >
        <input
          type="email"
          className={["r outline-none bg-gray-50 w-full", sizes[size]].join(
            " "
          )}
          value={value?.name}
        />
      </div>
      <div
        className={`absolute z-10 inset-x-0 shadow-lg top-[105%] p-2 d10 transition-all b rounded-md bg-gray-50 border-dark-300 ${
          open ? "" : "hidden"
        }`}
      >
        {isLoading ? (
          <div className="c min-h-[200px] h-full">
            <Spinner size={28} className="-mt-14" />
          </div>
        ) : error ? (
          <div className="c min-h-[200px] h-full">
            <p>Cannot load projects</p>
          </div>
        ) : res?.data.length ? (
          res?.data.map((project, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOpen(false);
                onChange(project);
              }}
              className="f w-full rounded py-2 px-4 ic hover:bg-gray-200 text-lg"
            >
              {project.name}
            </button>
          ))
        ) : (
          <div className="c min-h-[200px] h-full">
            <p className="-mt-14">No hypotheses</p>
          </div>
        )}
      </div>
    </div>
  );
};
