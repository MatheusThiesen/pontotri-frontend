"use client";

import { LocationDisplay } from "@/app/(private)/check-in/_components/location-display";
import { TimeDisplay } from "@/app/(private)/check-in/_components/time-display";
import { WebcamCapture } from "@/app/(private)/check-in/_components/webcam-capture";
import { DetailPage } from "@/components/layouts/detail";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/services/api";
import { compressImageBase64 } from "@/lib/utils/image";
import axios from "axios";
import { Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckInPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          toast.error("Não foi possível obter sua localização");
        }
      );
    }
  }, []);

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
  };

  const handleRegisterTime = async () => {
    if (!capturedImage) {
      toast.error("É necessário capturar uma foto para registrar o ponto");
      return;
    }

    if (!location) {
      toast.error(
        "É necessário permitir o acesso à localização para registrar o ponto"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const compressedImage = await compressImageBase64(capturedImage);

      await api.post("/time-records/check-in", {
        checkInImage: compressedImage,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      setCheckInSuccess(true);
      toast.success("Ponto registrado com sucesso!");

      setTimeout(() => {
        setCapturedImage(null);
        setCheckInSuccess(false);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warning(
          error.response?.data.message ||
            "Erro ao registrar ponto. Tente novamente."
        );
      } else {
        console.error("Erro ao registrar ponto:", error);
        toast.error("Erro ao registrar ponto. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DetailPage className="flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg">
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
            ) : !capturedImage ? (
              <WebcamCapture onCapture={handleCapture} isCapturing />
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
                  onClick={() => setCapturedImage(null)}
                >
                  Tirar Novamente
                </Button>
              </div>
            )}
          </div>

          <LocationDisplay />
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t pt-4">
          <Button
            className={`w-full ${
              !capturedImage
                ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400 "
                : "cursor-pointer bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
            }`}
            size="lg"
            onClick={handleRegisterTime}
            disabled={isSubmitting || checkInSuccess || !capturedImage}
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
