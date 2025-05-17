"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input as InputUi } from "../ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  isPass?: boolean;
}

export function InputForm({
  control,
  name,
  label,
  placeholder,
  description,
  isPass = false,
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="mb-4">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <InputUi
                type={!showPassword && isPass ? "password" : "text"}
                placeholder={placeholder}
                className={cn(
                  "transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                  fieldState.error
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                )}
                {...rest}
                {...field}
              />

              {isPass && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          {!!description && <FormDescription>{description}</FormDescription>}

          <FormMessage className="min-h-[1.25rem]" />
        </FormItem>
      )}
    />
  );
}
