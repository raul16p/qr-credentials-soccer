"use client";

import Video from "@/components/qr-code/video";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function ModalQR() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <main className="p-24">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            Registrar un nuevo usuario mediante su QR
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Título</DialogTitle>
            <DialogDescription>Descripción</DialogDescription>
          </DialogHeader>
          <Video setResult={setResult} setError={setError} setOpen={setOpen} />
          <DialogFooter>{error}</DialogFooter>
        </DialogContent>
      </Dialog>

      {error && (
        <div>
          <h3 className="text-lg font-bold text-cyan-500">
            Error del código QR
          </h3>
          <p className="text-cyan-800">Mensaje: {error}</p>
        </div>
      )}

      {result && (
        <div>
          <h3 className="text-lg font-bold text-green-500">
            Resultado del código QR
          </h3>
          <p className="text-green-800">Resultado: {result}</p>
        </div>
      )}
    </main>
  );
}
