import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import type { DefaultValues, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useDynamicForm } from "@/hooks/forms/useDynamicForm";

import type { DynamicFormProps } from "./DynamicForm.types";
import { FormField } from "./FormField";
import { getFormGridClass, getSubmitLabel } from "./DynamicForm.utils";

export function DynamicForm<TFieldValues extends FieldValues>({
  fields,
  defaultValues,
  schema,
  onSubmit,
  mode = "create",
  loading = false,
  disabled = false,
  submitLabel,
  cancelLabel = "Cancel",
  onCancel,
  className,
  formClassName,
  layout = "single",
  showFooter = true,
  id,
}: DynamicFormProps<TFieldValues>) {
  const form = useDynamicForm<TFieldValues>({
    schema,
    defaultValues: defaultValues as DefaultValues<TFieldValues>,
  });

  useEffect(() => {
    if (mode === "update" && defaultValues) {
      form.reset(defaultValues as DefaultValues<TFieldValues>);
    }
  }, [mode, defaultValues, form.reset]);

  const isDisabled = disabled || loading;
  const resolvedSubmitLabel = submitLabel ?? getSubmitLabel(mode);

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <div className={cn("w-full", className)}>
      <Form {...form}>
        <form
          id={id}
          onSubmit={handleSubmit}
          className={cn(getFormGridClass(layout), formClassName)}
          noValidate
        >
          {fields.map((fieldConfig) => (
            <FormField
              key={String(fieldConfig.name)}
              config={fieldConfig}
              control={form.control}
              formDisabled={isDisabled}
            />
          ))}

          {showFooter ? (
            <div className="col-span-full flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              {onCancel ? (
                <Button
                  type="button"
                  variant="outline"
                  disabled={isDisabled}
                  onClick={onCancel}
                  className="border-white/10 bg-white/[0.02] text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                >
                  {cancelLabel}
                </Button>
              ) : null}

              <Button
                type="submit"
                disabled={isDisabled}
                className="bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    {mode === "update" ? "Saving..." : "Creating..."}
                  </>
                ) : (
                  resolvedSubmitLabel
                )}
              </Button>
            </div>
          ) : null}
        </form>
      </Form>
    </div>
  );
}
