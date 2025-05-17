import { InputForm } from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signUpFormSchema = z.object({
  name: z
    .string({ required_error: "Informe seu nome" })
    .min(2, "O nome deve ter pelo menos 2 caracteres."),
  company: z.string({ required_error: "Informe o nome da empresa" }),
  cnpj: z
    .string({ required_error: "Informe o CNPJ" })
    .regex(
      /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
      "Informe um CNPJ válido no formato 00.000.000/0000-00"
    ),
  email: z
    .string({ required_error: "Informe seu endereço de e-mail" })
    .email("Por favor, insira um endereço de e-mail válido."),
  password: z
    .string({ required_error: "Informe sua senha" })
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar os termos." }),
  }),
});

type SignUpFormSchemaProps = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignUpFormSchemaProps>({
    resolver: zodResolver(signUpFormSchema),
  });

  const handleSignUp = async (data: SignUpFormSchemaProps) => {
    setIsLoading(true);

    try {
      await api.post("/accounts", {
        ...data,
        cnpj: data.cnpj.replace(/\D/g, ""),
      });

      toast.success("Cadastro realizado com sucesso!");

      router.push("/sign-in");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response?.status === 409) {
        toast.error("Usuário ou empresa já estão cadastrados.");
      } else {
        toast.error("Erro ao realizar o cadastro. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { handleSubmit, control } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <CardContent className="space-y-4 ">
          <InputForm
            name="name"
            label="Seu nome"
            placeholder="João Silva"
            control={control}
          />
          <InputForm
            name="company"
            label="Nome da empresa"
            placeholder="Empresa Exemplo LTDA"
            control={control}
          />
          <InputForm
            name="cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            control={control}
          />
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

          <FormField
            control={control}
            name="terms"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label htmlFor="terms" className="text-xs">
                    <span>
                      Eu concordo com os{" "}
                      <a
                        href="/terms"
                        className="font-medium text-teal-600 hover:text-teal-500 whitespace-nowrap"
                      >
                        Termos de Serviço
                      </a>{" "}
                      e a{" "}
                      <a
                        href="/privacy"
                        className="font-medium text-teal-600 hover:text-teal-500 whitespace-nowrap"
                      >
                        Política de Privacidade
                      </a>
                    </span>
                  </Label>
                  {/* {fieldState.error && (
                    <p className="text-red-500 text-xs">
                      {fieldState.error.message}
                    </p>
                  )} */}
                </div>
              </FormItem>
            )}
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
            Criar conta
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
