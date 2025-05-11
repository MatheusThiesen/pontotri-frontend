"use client";

import {
  DetailPage,
  DetailSubtitle,
  DetailTitle,
} from "@/components/layouts/detail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Edit, Key, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Sample user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Employee",
    department: "Engineering",
    employeeId: "EMP-12345",
    joinDate: "2022-01-15",
    phone: "+1 (555) 123-4567",
    location: "Main Office",
    enterprise: "Petry Tintas",
    manager: "Jane Smith",
  };

  return (
    <DetailPage>
      <DetailTitle>Perfil</DetailTitle>
      <DetailSubtitle>
        Gerencie suas informações pessoais e configurações da conta
      </DetailSubtitle>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center space-y-2 text-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4 text-xl">{user.name}</CardTitle>
            <CardDescription>{user.role}</CardDescription>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar Perfil
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsChangePasswordOpen(true)}
            >
              <Key className="mr-2 h-4 w-4" />
              Alterar Senha
            </Button>
          </CardContent>
        </Card>

        {/* User Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações do Usuário</CardTitle>
            <CardDescription>
              Seus dados pessoais e profissionais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="work">
                  Informações Profissionais
                </TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Nome completo
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Email
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Telefone
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {user.phone}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Endereço
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {user.location}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="work" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Empresa
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {user.enterprise}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Departamento
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {user.department}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Cargo
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {user.role}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Data de admissão
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-500">
                      Gestor
                    </Label>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {user.manager}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>Suas últimas atividades de ponto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {i % 2 === 0 ? "Checked in" : "Checked out"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(
                      Date.now() - i * 24 * 60 * 60 * 1000
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {i % 3 === 0
                    ? "Main Office"
                    : i % 3 === 1
                    ? "Branch Office"
                    : "Remote"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="registers" className="w-full">
            <Button variant="outline" className="w-full">
              Ver todas as atividades
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Atualize suas informações de perfil. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                defaultValue={user.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                defaultValue={user.email}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              <Input
                id="phone"
                defaultValue={user.phone}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProfileOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={() => setIsEditProfileOpen(false)}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Informe sua senha atual e defina uma nova senha.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-password" className="text-right">
                Atual
              </Label>
              <Input
                id="current-password"
                type="password"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" className="text-right">
                Nova
              </Label>
              <Input id="new-password" type="password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                Confirmar
              </Label>
              <Input
                id="confirm-password"
                type="password"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={() => setIsChangePasswordOpen(false)}>
              Atualizar Senha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DetailPage>
  );
}
