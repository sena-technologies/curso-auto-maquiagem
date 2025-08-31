import { Heart, Shield, Sparkles, Users } from "lucide-react"

export function AboutValues() {
  const values = [
    {
      icon: Heart,
      title: "Paixão",
      description: "Cada peça é criada com amor e dedicação, refletindo nossa paixão pela arte da joalheria.",
    },
    {
      icon: Shield,
      title: "Qualidade",
      description: "Utilizamos apenas materiais de alta qualidade e processos rigorosos de controle.",
    },
    {
      icon: Sparkles,
      title: "Elegância",
      description: "Designs únicos e sofisticados que realçam a beleza natural de cada mulher.",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Construímos uma comunidade de mulheres que se apoiam e celebram sua individualidade.",
    },
  ]

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nossos Valores</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Os princípios que guiam cada decisão e cada peça que criamos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
