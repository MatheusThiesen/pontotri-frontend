"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
  isCapturing: boolean;
}

export function WebcamCapture({ onCapture, isCapturing }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isCapturing) {
      iniciarCamera();
    } else {
      pararCamera();
    }

    return () => {
      pararCamera();
    };
  }, [isCapturing]);

  const iniciarCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      setCameraError(
        "Não foi possível acessar a câmera. Verifique as permissões."
      );
    }
  };

  const pararCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturarFoto = () => {
    setCountdown(3);

    const contadorInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(contadorInterval);
          tirarFoto();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const tirarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageSrc = canvas.toDataURL("image/png");
        onCapture(imageSrc);
      }
    }
  };

  if (cameraError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Alert variant="destructive" className="max-w-xs">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{cameraError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      <canvas ref={canvasRef} className="hidden" />

      {countdown && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-6xl font-bold text-white bg-black/50 w-24 h-24 rounded-full flex items-center justify-center">
            {countdown}
          </div>
        </div>
      )}

      {isCapturing && !countdown && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white">
            <p className="text-lg font-medium mb-4">
              Sorria e prepare-se para bater o ponto!
            </p>
            <Button
              onClick={capturarFoto}
              className="bg-white text-black hover:bg-white/90"
            >
              <Camera className="mr-2 h-4 w-4" />
              Tirar Foto
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
