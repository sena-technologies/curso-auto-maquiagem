import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Rua das Flores, 123", "Centro - São Paulo, SP", "CEP: 01234-567"],
    },
    {
      icon: Phone,
      title: "Telefone",
      details: ["(11) 9999-8888", "(11) 3333-4444"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contato@luminajoias.com.br", "vendas@luminajoias.com.br"],
    },
    {
      icon: Clock,
      title: "Horário de Funcionamento",
      details: ["Segunda a Sexta: 9h às 18h", "Sábado: 9h às 14h", "Domingo: Fechado"],
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Entre em Contato</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo ou preencha o formulário ao lado.
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 dark:text-gray-300 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
