"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    description: "Para pequenas equipes começando com controle de ponto",
    price: "R$ 0",
    priceDescription: "/mês",
    features: [
      "Até 3 usuários",
      "Check-in facial + GPS",
      "Relatórios",
      "Exportação de dados",
      "Controle de horas extras",
      "Suporte por email",
    ],
    buttonText: "Começar gratuitamente",
    buttonVariant: "outline" as const,
    isPopular: false,
    href: "sign-up",
  },
  {
    name: "Essencial",
    description: "Para equipes em crescimento que precisam de mais recursos",
    price: "R$ 49,90",
    priceDescription: "/mês",
    features: [
      "Até 10 usuários",
      "Check-in facial + GPS",
      "Relatórios",
      "Exportação de dados",
      "Controle de horas extras",
      "Suporte prioritário",
    ],
    buttonText: "Assinar plano",
    buttonVariant: "default" as const,
    isPopular: false,
    href: "sign-up",
  },
  {
    name: "Profissional",
    description: "Para empresas que precisam de recursos avançados",
    price: "R$ 149,90",
    priceDescription: "/mês",
    features: [
      "Até 50 usuários",
      "Check-in facial + GPS",
      "Relatórios",
      "Controle de horas extras",
      "Suporte prioritário",
    ],
    buttonText: "Assinar plano",
    buttonVariant: "default" as const,
    isPopular: true,
    href: "sign-up",
  },
  {
    name: "Empresarial",
    description:
      "Para médias e grandes empresas que precisam escalar o controle de ponto",
    price: "R$ 299,90",
    priceDescription: "/mês",
    features: [
      "Até 100 usuários",
      "Check-in facial + GPS",
      "Relatórios",
      "Controle de horas extras",
      "Suporte prioritário",
    ],
    buttonText: "Assinar plano",
    buttonVariant: "default" as const,
    isPopular: false,
    href: "sign-up",
  },
  // {
  //   name: "Empresarial",
  //   description: "Solução personalizada para grandes empresas",
  //   price: "Sob consulta",
  //   priceDescription: "",
  //   features: [
  //     "Usuários ilimitados",
  //     "Acesso à API",
  //     "Regras personalizadas",
  //     "Suporte de onboarding",
  //     "Gerente de conta dedicado",
  //     "SLA garantido",
  //     "Personalização completa",
  //   ],
  //   buttonText: "Fale com nosso time",
  //   buttonVariant: "outline" as const,
  //   isPopular: false,
  // },
];

export function PricingSection() {
  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Planos e Preços
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para sua empresa. Todos os planos incluem
            acesso ao aplicativo móvel e painel web.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-${plans.length}`}
        >
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col h-full ${
                plan.isPopular
                  ? "border-teal-500 shadow-lg relative before:absolute before:-top-5 before:left-0 before:right-0 before:mx-auto before:w-40 before:content-[''] before:h-1 before:bg-gradient-to-r before:from-teal-500 before:to-blue-500"
                  : ""
              }`}
            >
              <CardHeader className="pb-8">
                {plan.isPopular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
                    Recomendado
                  </Badge>
                )}
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="pt-1.5 h-12">
                  {plan.description}
                </CardDescription>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-3xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    {plan.priceDescription}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-teal-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Link className="w-full" href={plan.href}>
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-2">
            <span className="text-sm">Precisa de ajuda para escolher?</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Mais informações</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Entre em contato com nossa equipe para uma consultoria
                    personalizada e encontre o plano ideal para sua empresa.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="link"
              className="ml-2 text-teal-600 hover:text-teal-700"
            >
              Agendar demonstração
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
