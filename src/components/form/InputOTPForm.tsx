import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Control } from "react-hook-form"

type OTPFieldProps = {
  control: Control<any>
  name: string
  label?: string
  length?: number
}

export const InputOTPForm = ({
  control,
  name,
  label = "Código",
  length = 6,
}: OTPFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputOTP
              maxLength={length}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              {Array.from({ length }).map((_, idx) => (
                <InputOTPGroup key={idx}>
                  <InputOTPSlot index={idx} />
                </InputOTPGroup>
              ))}
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
