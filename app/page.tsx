"use client";

import { CoffeeDebtorsCarousel } from "@/components/coffee-debtors-carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Deudores de café Tools
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Deben café al team ☕
          </p>

          {/* Modal del Reglamento */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Reglamento</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Reglamento del Café ☕</DialogTitle>
                <DialogDescription>
                  Normas oficiales del equipo para el ritual semanal del café.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    1. Día y hora
                  </h3>
                  <p>
                    La daily es todos los{" "}
                    <strong>jueves a las 9:10 a.m. en punto</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    2. Cómo se cuenta
                  </h3>
                  <p>
                    El <strong>último en conectarse</strong>{" "}
                    a la reunión desde su computadora (no cuenta el celular)
                    será quien tenga que invitar los cafés al equipo.
                  </p>
                  <p className="mt-2">
                    Se considera “conectado” cuando aparece en la sala virtual
                    de la daily y puede ser visto o escuchado por el resto.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    3. Excepciones
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Si alguien avisa por anticipado (al menos 10 minutos
                      antes) que tendrá un problema legítimo y el equipo lo
                      acepta, no contará como último.
                    </li>
                    <li>Si todos llegan puntuales, ¡nadie invita!</li>
                    <li>
                      Si el organizador o TL llega tarde, también puede ser
                      acreedor a la invitación.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    4. Entrega de café
                  </h3>
                  <p>
                    El invitado debe encargarse de organizar la compra y entrega
                    de los cafés el viernes o antes del siguiente jueves.
                  </p>
                  <p className="mt-2">
                    Puede elegir el método (Canteen, Starbucks, Oxxo, giftcard,
                    etc.), pero debe ser equitativo para todos los presentes ese
                    día.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    5. Transparencia
                  </h3>
                  <p>
                    El registro de quién paga cada semana se llevará en el chat
                    del equipo o en una tabla de seguimiento.
                  </p>
                  <p className="mt-2">
                    Si alguien no cumple, la deuda se acumula y se agrega a la
                    fila de deudores.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <CoffeeDebtorsCarousel />
      </div>
    </main>
  );
}
