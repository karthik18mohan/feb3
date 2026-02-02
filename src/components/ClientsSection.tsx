import Image from "next/image";
import { forwardRef } from "react";

import clients from "../../data/clients.json";

type Client = {
  id: string;
  name?: string;
};

type ClientsSectionProps = {
  id?: string;
  className?: string;
};

export const ClientsSection = forwardRef<HTMLElement, ClientsSectionProps>(
  ({ id, className }, ref) => {
    return (
      <section ref={ref} id={id} className={className ?? "w-full min-h-screen"}>
        <div className="flex min-h-screen flex-col pt-28">
          <div className="relative h-[30vh] min-h-[200px] w-full flex-shrink-0 overflow-hidden">
            <Image
              src="/images/clients/1.jpg"
              alt="Clients hero background"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink/70" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
              <h1 className="font-heading text-4xl font-semibold text-paper sm:text-5xl lg:text-6xl">
                Our Clients
              </h1>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto bg-paper py-12">
            <div className="mx-auto w-full max-w-[1180px] px-6">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                {(clients as Client[]).map((client) => (
                  <div key={client.id} className="flex flex-col items-center text-center">
                    <div className="flex h-24 w-full items-center justify-center">
                      <Image
                        src={`/images/clients/${client.id}/1.jpg`}
                        alt={client.name ? `${client.name} logo` : "Client logo"}
                        width={200}
                        height={120}
                        className="h-16 w-auto object-contain transition duration-300 ease-out hover:scale-105"
                      />
                    </div>
                    {client.name ? (
                      <p className="mt-3 text-sm font-medium text-ink/70">{client.name}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ClientsSection.displayName = "ClientsSection";
