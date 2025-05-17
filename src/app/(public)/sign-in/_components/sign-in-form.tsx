import { InputForm } from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Informe seu endereço de e-mail" })
    .email("Por favor, insira um endereço de e-mail válido."),
  password: z
    .string({ required_error: "Informe sua senha" })
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type SignInFormSchemaProps = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignInFormSchemaProps>({
    resolver: zodResolver(signInFormSchema),
  });

  const handleSignIn = async (credentials: SignInFormSchemaProps) => {
    setIsLoading(true);

    try {
      await signIn(credentials);

      router.push("/home");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response?.status ?? 0 >= 40) {
        toast.error("E-mail ou senha incorretos.");
      } else {
        toast.error("Erro ao realizar login. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { handleSubmit, control } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <CardContent className="space-y-4 ">
          <InputForm
            name="email"
            label="E-mail"
            placeholder="nome@empresa.com"
            control={control}
          />
          <InputForm
            name="password"
            label="Senha"
            placeholder="••••••••"
            control={control}
            isPass
          />
        </CardContent>

        <CardFooter className="mt-3">
          <Button
            type="submit"
            className="w-full py-6 text-base font-medium transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
