import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useFormHookOnSubmit } from "~/hooks/form-hook";
import { useAddDiningTableForm } from "~/services/dining-table";

const DiningTableDialog = () => {
  const form = useAddDiningTableForm();
  const onSubmit = useFormHookOnSubmit(form.handleSubmit);

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" className="border border-dashed" type="button">
          <Plus />
          <span>Dining Table</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <form.AppField
            name="name"
            children={(field) => (
              <field.FormFieldItem>
                <field.FormFieldLabel>Name</field.FormFieldLabel>
                <field.FormFieldControl>
                  <Input
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </field.FormFieldControl>
                <field.FormFieldMessage />
              </field.FormFieldItem>
            )}
          />

          <form.AppField
            name="capacity"
            children={(field) => (
              <field.FormFieldItem>
                <field.FormFieldLabel>Capacity</field.FormFieldLabel>
                <field.FormFieldControl>
                  <Input
                    type="number"
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  />
                </field.FormFieldControl>
                <field.FormFieldMessage />
              </field.FormFieldItem>
            )}
          />

          <form.AppField
            name="description"
            children={(field) => (
              <field.FormFieldItem>
                <field.FormFieldLabel>Description</field.FormFieldLabel>
                <field.FormFieldControl>
                  <Textarea
                    className="min-h-32"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </field.FormFieldControl>
                <field.FormFieldMessage />
              </field.FormFieldItem>
            )}
          />

          <form.AppForm>
            <form.FormButton
              children={({ isPending }) =>
                isPending ? "Submitting..." : "Submit"
              }
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default DiningTableDialog;
