"use client";

import { DetailPage } from "@/components/layouts/detail";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

// Mock data
const currentPlan = {
  name: "Profissional",
  price: "R$ 149,90",
  cycle: "mensal",
  activeUsers: 12,
  maxUsers: 50,
  renewalDate: "15/06/2023",
  paymentMethod: "Cartão de crédito terminando em 4242",
};

const invoices = [
  {
    id: "INV-001",
    date: "15/05/2023",
    amount: "R$ 149,90",
    status: "Pago",
  },
  {
    id: "INV-002",
    date: "15/04/2023",
    amount: "R$ 149,90",
    status: "Pago",
  },
  {
    id: "INV-003",
    date: "15/03/2023",
    amount: "R$ 149,90",
    status: "Pago",
  },
];

export default function SubscriptionSettingsPage() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  return (
    <DetailPage>
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Configurações do Plano
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seu plano de assinatura, faturamento e usuários
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Alterar plano
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Current Plan Card */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Plano Atual</CardTitle>
                <Badge className="bg-primary">{currentPlan.name}</Badge>
              </div>
              <CardDescription>
                Detalhes do seu plano atual e utilização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Preço</p>
                  <p className="text-sm text-muted-foreground">
                    {currentPlan.price}/{currentPlan.cycle}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Ciclo de cobrança
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {currentPlan.cycle}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Usuários ativos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentPlan.activeUsers} de {currentPlan.maxUsers}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Próxima renovação
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentPlan.renewalDate}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Utilização de usuários</span>
                    <span className="font-medium">
                      {currentPlan.activeUsers}/{currentPlan.maxUsers}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-300"
                      style={{
                        width: `${
                          (currentPlan.activeUsers / currentPlan.maxUsers) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Faturamento</CardTitle>
              <CardDescription>
                Informações de pagamento e faturas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Próxima fatura
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {currentPlan.renewalDate}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Método de pagamento
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CreditCard className="mr-1 h-4 w-4" />
                  {currentPlan.paymentMethod}
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium leading-none">
                    Histórico de faturas
                  </p>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Ver todas
                  </Button>
                </div>
                <div className="space-y-2">
                  {invoices.slice(0, 3).map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{invoice.date}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{invoice.amount}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Gerenciar métodos de pagamento
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Cancel Subscription Section */}
        <div className="mt-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Cancelar assinatura</CardTitle>
              <CardDescription>
                Cancele ou pause sua assinatura a qualquer momento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Ao cancelar sua assinatura, você continuará tendo acesso ao
                serviço até o final do período de faturamento atual. Após esse
                período, sua conta será rebaixada para o plano gratuito com
                recursos limitados.
              </p>
              <Dialog
                open={showCancelDialog}
                onOpenChange={setShowCancelDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="destructive">Cancelar assinatura</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tem certeza que deseja cancelar?</DialogTitle>
                    <DialogDescription>
                      Esta ação não pode ser desfeita. Sua assinatura será
                      cancelada e você perderá acesso aos recursos premium após
                      o período atual.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="rounded-lg border p-4 bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            Seus dados serão preservados
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Você poderá reativar sua assinatura a qualquer
                            momento para recuperar o acesso completo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowCancelDialog(false)}
                    >
                      Voltar
                    </Button>
                    <Button variant="destructive">
                      Confirmar cancelamento
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </DetailPage>
  );
}
