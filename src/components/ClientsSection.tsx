import Image from "next/image";

import clients from "../../data/clients.json";

type Client = {
  id: string;
  name?: string;
};

export function ClientsSection() {
  return (
    <section className="w-full">
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <Image
          src="/images/clients/0.jpg"
          alt="Clients hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink/70" />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-paper/70">
            Our Clients
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-paper sm:text-5xl lg:text-6xl">
            Trusted by leaders across industries
          </h1>
        </div>
      </div>

      <div className="bg-paper py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {(clients as Client[]).map((client) => (
              <div key={client.id} className="flex flex-col items-center text-center">
                <div className="flex h-24 w-full items-center justify-center">
                  <Image
                    src={`/images/clients/${client.id}/logo.jpg`}
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
    </section>
  );
}
