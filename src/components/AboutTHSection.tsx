import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const AboutTHSection = () => {
  const faqs = [
    {
      question: "O que é terapia hormonal?",
      answer: "A terapia hormonal é um tratamento médico que utiliza hormônios para promover características físicas alinhadas com a identidade de gênero da pessoa."
    },
    {
      question: "Quando posso começar a TH?",
      answer: "O início da TH deve ser sempre acompanhado por profissionais de saúde qualificados. Cada caso é único e requer avaliação médica individual."
    },
    {
      question: "Quais são os efeitos esperados?",
      answer: "Os efeitos variam entre pessoas e dependem do tipo de hormônio, dosagem e tempo de uso. É importante ter expectativas realistas e acompanhamento médico."
    },
    {
      question: "É seguro fazer TH?",
      answer: "Com acompanhamento médico adequado e exames regulares, a TH é considerada segura. Nunca faça automedicação."
    }
  ];

  return (
    <section id="sobre-th" className="py-20 bg-gradient-to-br from-white to-trans-lavender/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-trans bg-clip-text text-transparent">
              Entendendo a Terapia Hormonal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Informações claras e acessíveis sobre TH para te ajudar a tomar decisões informadas na sua jornada
            </p>
          </div>

          <Tabs defaultValue="geral" className="mb-16">
            <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="geral" className="data-[state=active]:bg-trans-pink/20">Informações Gerais</TabsTrigger>
              <TabsTrigger value="feminina" className="data-[state=active]:bg-trans-blue/20">TH Feminina</TabsTrigger>
              <TabsTrigger value="masculina" className="data-[state=active]:bg-trans-purple/20">TH Masculina</TabsTrigger>
            </TabsList>
            
            <TabsContent value="geral" className="mt-8">
              <Card className="border-trans-pink/20 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-trans-purple">O que você precisa saber</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>A terapia hormonal é um processo individual que requer acompanhamento médico especializado. Cada pessoa tem necessidades únicas e respostas diferentes ao tratamento.</p>
                    <p>É essencial buscar profissionais qualificados e ter acesso a informações confiáveis para uma jornada segura e bem-sucedida.</p>
                    <p>Nossa comunidade está aqui para oferecer suporte, compartilhar experiências e conectar você com recursos valiosos.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feminina" className="mt-8">
              <Card className="border-trans-blue/20 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-trans-blue">Terapia Hormonal Feminina</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>A TH feminina geralmente utiliza estrogênio e anti-andrógenos para promover características femininas como desenvolvimento mamário, redistribuição de gordura e diminuição de pelos corporais.</p>
                    <p>Os efeitos começam a aparecer gradualmente, com algumas mudanças visíveis nos primeiros meses e outras ao longo de anos.</p>
                    <p>Acompanhamento médico regular é essencial para monitorar níveis hormonais e possíveis efeitos colaterais.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="masculina" className="mt-8">
              <Card className="border-trans-purple/20 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-trans-purple">Terapia Hormonal Masculina</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>A TH masculina utiliza testosterona para promover características masculinas como engrossamento da voz, crescimento de pelos faciais e corporais, e redistribuição de massa muscular.</p>
                    <p>Algumas mudanças são permanentes, enquanto outras podem ser reversíveis se o tratamento for interrompido.</p>
                    <p>É importante discutir expectativas e planos de longo prazo com seu médico endocrinologista.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* FAQ Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-trans-pink/20">
            <h3 className="text-2xl font-semibold mb-8 text-center text-trans-purple">Perguntas Frequentes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-gray-800">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="border-trans-purple text-trans-purple hover:bg-trans-purple/10">
                Ver Todas as Perguntas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTHSection;
