"use client";

import { DetailPage } from "@/components/layouts/detail";
import { LocationDisplay } from "@/components/location-display";
import { TimeDisplay } from "@/components/time-display";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WebcamCapture } from "@/components/webcam-capture";
import { Camera, Clock, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CheckInPage() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setIsCapturing(false);
  };

  const handleRegisterTime = async () => {
    if (!capturedImage) {
      setIsCapturing(true);
      return;
    }

    setIsSubmitting(true);

    // Simular chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setCheckInSuccess(true);

    // Resetar após mostrar mensagem de sucesso
    setTimeout(() => {
      setCapturedImage(null);
      setCheckInSuccess(false);
    }, 3000);
  };

  return (
    <DetailPage className="flex justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center border-b pb-4">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-teal-600 mr-2" />
            <CardTitle className="text-2xl font-bold">
              Registrar Ponto
            </CardTitle>
          </div>
          <CardDescription>
            Capture seu rosto para registrar entrada/saída
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 px-6 pb-4">
          <TimeDisplay />

          <div className="mt-6 rounded-lg overflow-hidden bg-gray-900 aspect-video relative">
            {checkInSuccess ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-600 text-white">
                <div className="text-3xl font-bold mb-2">Sucesso!</div>
                <p>Seu horário foi registrado</p>
              </div>
            ) : isCapturing || !capturedImage ? (
              <WebcamCapture
                onCapture={handleCapture}
                isCapturing={isCapturing}
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Capturada"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => setIsCapturing(true)}
                >
                  Tirar Novamente
                </Button>
              </div>
            )}

            {!isCapturing && !capturedImage && !checkInSuccess && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                <Camera className="h-12 w-12 mb-2" />
                <p className="text-center px-4">
                  Clique no botão "Capturar Foto" para ativar sua câmera
                </p>
              </div>
            )}
          </div>

          <LocationDisplay />
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t pt-4">
          {!capturedImage && !checkInSuccess && (
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={() => setIsCapturing(true)}
            >
              <Camera className="mr-2 h-4 w-4" />
              Capturar Foto
            </Button>
          )}

          <Button
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
            onClick={handleRegisterTime}
            disabled={isSubmitting || checkInSuccess}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Registrar Horário
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </DetailPage>
  );
}
