"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "./_components/sign-up-form";

const signUpFormSchema = z.object({
  email: z
    .string({ required_error: "Informe seu endereço de e-mail" })
    .email("Por favor, insira um endereço de e-mail válido."),
  password: z.string({ required_error: "Informe sua senha" }),
});

type SignUpFormSchemaProps = z.infer<typeof signUpFormSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpFormSchemaProps>({
    resolver: zodResolver(signUpFormSchema),
  });

  const handleSignUp = async (data: SignUpFormSchemaProps) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const { handleSubmit, control } = form;

  const handleBack = () => router.back();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-gray-500 hover:text-gray-700"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div className="mb-8 flex items-center">
        <img src="/assets/logo-short.png" alt="logo" className="h-10 mr-2" />
        <span className="text-2xl font-bold">
          Ponto<span className="text-primary">TRI</span>
        </span>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Criar conta
          </CardTitle>
          <CardDescription className="text-center">
            Cadastre-se para começar a usar o PontoTRI.
          </CardDescription>
        </CardHeader>

        <SignUpForm />
      </Card>

      <p className="mt-6 text-center text-sm text-gray-600">
        Já tem uma conta?{" "}
        <a
          href="/sign-in"
          className="font-medium text-teal-600 hover:text-teal-500"
        >
          Entrar
        </a>
      </p>
    </div>
  );
}
