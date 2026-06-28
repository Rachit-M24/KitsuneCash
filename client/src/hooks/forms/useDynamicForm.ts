import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues, FieldValues, Resolver } from "react-hook-form";
import type { ZodTypeAny } from "zod";

interface UseDynamicFormOptions<TFieldValues extends FieldValues> {
  schema?: ZodTypeAny;
  defaultValues?: DefaultValues<TFieldValues>;
  validationMode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
}

export function useDynamicForm<TFieldValues extends FieldValues>({
  schema,
  defaultValues,
  validationMode = "onSubmit",
}: UseDynamicFormOptions<TFieldValues>) {
  const resolver = schema
    ? (zodResolver(schema) as Resolver<TFieldValues>)
    : undefined;

  return useForm<TFieldValues>({
    defaultValues,
    resolver,
    mode: validationMode,
  });
}
