import { useApi } from "common/src/hooks/useApi";
import { EditIcon, TrashIcon } from "common/src/icons";
import { showToast } from "common/src/lib/showToast";
import { ProjectFormType } from "common/src/types";
import {
  Button,
  IconButton,
  Input,
  Modal,
  Textarea,
  Checkbox,
} from "common/src/ui";
import React, { useCallback, useState } from "react";
import { mutate } from "swr";

interface props {
  initialFields?: ProjectFormType["fields"];
}

export const EditForm: React.FC<props> = ({ initialFields = [] }) => {
  const [fields, setFields] =
    useState<ProjectFormType["fields"]>(initialFields);
  const [open, setOpen] = useState(false);
  const { loading, run } = useApi("PUT", "/super-admin/project-form");

  const addField = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const desc = (form.elements.namedItem("desc") as HTMLInputElement).value;
    const required = (form.elements.namedItem("required") as HTMLInputElement)
      .checked;

    setFields((x) => [...x, { name, desc, id: x.length + 1, required }]);
  }, []);

  return (
    <div className="space-y-6 py-4 md:bg-white md:p-6 lg:p-8 md:shadow-md rounded-md">
      <h3>Edit Form</h3>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="space-y-4 w-80 md:w-96" onSubmit={addField}>
          <h4>Add Field</h4>
          <Input label="Field name" name="name" required />
          <Input label="Field description" name="desc" />
          <Checkbox label="Required" defaultChecked name="required" />
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Modal>
      {fields.map((x, idx) => (
        <Field
          key={idx}
          {...x}
          onChange={(y: ProjectFormType["fields"][number]) =>
            setFields(
              fields.map((z) => {
                if (z.id !== x.id) return z;
                y.id = x.id;

                return y;
              })
            )
          }
          onDelete={() => setFields(fields.filter((y) => y.id !== x.id))}
        />
      ))}
      <div className="md:flex space-y-2 md:space-y-0 jb">
        <Button
          className="!px-4 !rounded-md relative custom-top-bar w-40"
          onClick={() => setOpen(true)}
        >
          + Add Field
        </Button>
      </div>
      <Button
        btn="success"
        className="w-full !mt-8"
        loading={loading}
        onClick={async () => {
          const res = await run({
            body: JSON.stringify({ fields }),
          });
          if (res && res.success)
            showToast(
              "success",
              "Project form updated successfully",
              res.message
            );
          else showToast("error", "Unable to update Project form", res.error);
          await mutate("/super-admin/project-form");
        }}
      >
        Submit
      </Button>
    </div>
  );
};

const Field = ({ name, desc, required, onChange, onDelete }: any) => {
  const [open, setOpen] = useState(false);
  const onEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const desc = (form.elements.namedItem("desc") as HTMLInputElement).value;
    const required = (form.elements.namedItem("required") as HTMLInputElement)
      .checked;

    onChange({ name, desc, required });
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="space-y-4 w-80 md:w-96" onSubmit={onEdit}>
          <h4>Edit Field</h4>
          <Input label="Field name" name="name" defaultValue={name}></Input>
          <Input label="Field Description" name="desc" defaultValue={desc} />
          <Checkbox
            label="Required"
            desc="Mark this field as required"
            defaultChecked={required}
            name="required"
          />
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Modal>
      <div className="f space-x-2 justify-end -mb-14">
        <IconButton
          onClick={() => setOpen(true)}
          className="bg-blue-200 !p-1.5 text-blue-500"
        >
          <EditIcon size={22} />
        </IconButton>
        <IconButton onClick={onDelete} className="!bg-red-200 !text-red-500">
          <TrashIcon />
        </IconButton>
      </div>
      <Textarea
        label={name}
        desc={desc}
        containerClassName="flex-1"
        placeholder={required ? "" : "optional"}
        labelClassName="!font-bold md:text-lg"
      />
    </div>
  );
};
