"use client";
import QrScanner from "qr-scanner";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export default function Video({
  setResult,
  setError,
  setOpen,
}: {
  setResult: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //TODO: Verificar si el dispositivo tiene cámara
  const videRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (videRef.current) {
      qrScannerRef.current = new QrScanner(
        videRef.current,
        (result) => {
          console.log("decoded qr code: ", result);
          setResult(result.data);
          setOpen(false);
        },
        {
          highlightCodeOutline: true,
          highlightScanRegion: true,
          maxScansPerSecond: 5,
        }
      );
    }

    qrScannerRef.current?.start().catch((err) => {
      if (typeof err === "string") setError(err);
      else setError("Ocurrió un error");
    });

    return () => {
      //Limpieza de refs para que no se quede la cámara en uso pero sin vista
      qrScannerRef.current?.destroy();
      qrScannerRef.current = null;
    };
  }, []);

  return (
    <div>
      <h2>Introduce el código QR</h2>
      <video
        id="camara-qr"
        ref={videRef}
        className="w-max[500px] h-max[500px] w-min[350px] h-min[350px]"
      ></video>
    </div>
  );
}
