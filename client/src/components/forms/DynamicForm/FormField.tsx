import type { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import type { FieldConfig } from "./DynamicForm.types";
import { FORM_LABEL_CLASS, getColSpanClass, resolveFieldConfig } from "./DynamicForm.utils";
import { renderField } from "./fieldRenderer";

interface FormFieldProps<TFieldValues extends FieldValues> {
  config: FieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
  formDisabled?: boolean;
}

export function FormField<TFieldValues extends FieldValues>({
  config,
  control,
  formDisabled = false,
}: FormFieldProps<TFieldValues>) {
  const resolved = resolveFieldConfig(config, formDisabled);

  if (resolved.resolvedHidden) {
    return null;
  }

  const Icon = resolved.resolvedIcon;

  return (
    <div className={cn(getColSpanClass(resolved.colSpan), resolved.resolvedClassName)}>
      <ShadcnFormField
        control={control}
        name={resolved.name as Path<TFieldValues>}
        render={({ field, fieldState }) => (
          <FormItem>
            {resolved.resolvedLabel ? (
              <FormLabel className={FORM_LABEL_CLASS}>
                {Icon ? (
                  <Icon className="size-3.5 text-orange-400/80" aria-hidden />
                ) : null}
                {resolved.resolvedLabel}
                {resolved.required ? (
                  <span className="text-orange-400" aria-hidden>
                    {" "}
                    *
                  </span>
                ) : null}
              </FormLabel>
            ) : null}

            <FormControl>
              {renderField(resolved, {
                field: {
                  name: field.name,
                  value: field.value,
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                  ref: field.ref,
                },
                hasError: !!fieldState.error,
              })}
            </FormControl>

            {resolved.resolvedDescription ? (
              <FormDescription className="text-zinc-500">
                {resolved.resolvedDescription}
              </FormDescription>
            ) : null}

            <FormMessage>
              {config.overrides?.validationMessage}
            </FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
