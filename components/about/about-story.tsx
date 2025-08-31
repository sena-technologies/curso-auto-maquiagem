import Image from "next/image"

export function AboutStory() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Como Tudo Começou</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Nossa jornada começou em 2012, quando nossa fundadora Maria Silva decidiu transformar sua paixão por joias
              em um negócio que pudesse democratizar o acesso à beleza e elegância.
            </p>
            <p>
              Começamos pequenos, em um ateliê familiar, criando peças únicas para amigas e familiares. O que era um
              hobby se transformou rapidamente em uma paixão compartilhada por milhares de mulheres.
            </p>
            <p>
              Hoje, somos uma das principais marcas de semijoias do país, mantendo sempre nossos valores de qualidade,
              elegância e acessibilidade.
            </p>
          </div>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image src="/placeholder-somdd.png" alt="Ateliê de criação de semijoias" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
