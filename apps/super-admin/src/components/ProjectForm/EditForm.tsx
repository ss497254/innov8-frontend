import { useApi } from "common/src/hooks/useApi";
import { EditIcon, TrashIcon } from "common/src/icons";
import { showToast } from "common/src/lib/showToast";
import { Button, IconButton, Input, Modal, Textarea } from "common/src/ui";
import React, { useCallback, useState } from "react";

interface props {}

export const EditForm: React.FC<props> = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const { loading, run } = useApi("PUT", "/super-admin/hypotheses/");

  const addField = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const desc = (form.elements.namedItem("desc") as HTMLInputElement).value;

    setFields((x) => [...x, { name, desc, id: x.length + 1 }]);
  }, []);

  return (
    <div className="space-y-5 py-4">
      <h2>Edit Form</h2>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="space-y-4 w-80" onSubmit={addField}>
          <h4>Add Field</h4>
          <Input label="Field name" name="name"></Input>
          <Input label="Field Description" name="desc"></Input>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Modal>
      {fields.map((x, idx) => (
        <Field
          key={idx}
          {...x}
          onChange={(x: any) =>
            setFields(
              fields.map((y) => {
                if (y.id !== x.id) return y;

                return x;
              })
            )
          }
          onDelete={() => setFields(fields.filter((y) => y.id !== x.id))}
        />
      ))}
      <div className="md:flex space-y-2 md:space-y-0 jb">
        <Button
          className="!px-4 !rounded-md relative custom-top-bar"
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
        }}
      >
        Submit
      </Button>
    </div>
  );
};

const Field = ({ name, desc, onChange, onDelete }: any) => {
  const [open, setOpen] = useState(false);
  const onEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const desc = (form.elements.namedItem("desc") as HTMLInputElement).value;

    onChange({ name, desc });
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="space-y-4 w-80" onSubmit={onEdit}>
          <h4>Edit Field</h4>
          <Input label="Field name" name="name" defaultValue={name}></Input>
          <Input
            label="Field Description"
            name="desc"
            defaultValue={desc}
          ></Input>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Modal>
      <Textarea label={name} desc={desc} containerClassName="flex-1" />
      <div className="f space-x-2 justify-end">
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
    </div>
  );
};
