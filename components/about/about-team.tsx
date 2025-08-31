import Image from "next/image"

export function AboutTeam() {
  const team = [
    {
      name: "Maria Silva",
      role: "Fundadora & CEO",
      image: "/placeholder-qv0xm.png",
      description: "Visionária por trás da marca, com mais de 15 anos de experiência no mercado de joias.",
    },
    {
      name: "Ana Costa",
      role: "Designer Chefe",
      image: "/creative-woman-jewelry-designer.png",
      description: "Responsável pela criação de nossos designs únicos e tendências de moda.",
    },
    {
      name: "Carlos Mendes",
      role: "Diretor de Produção",
      image: "/professional-production-director.png",
      description: "Garante a qualidade e excelência em cada etapa do processo produtivo.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nossa Equipe</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Conheça as pessoas apaixonadas que tornam nossa visão realidade
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div key={index} className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium mb-3">{member.role}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
