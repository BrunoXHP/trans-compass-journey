import { Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerSections = [{
    title: "Plataforma",
    links: [{
      label: "Sobre TH",
      href: "/sobre-th"
    }, {
      label: "Agenda",
      href: "/agenda"
    }, {
      label: "Comunidade",
      href: "/comunidade"
    }, {
      label: "Eventos",
      href: "/eventos"
    }]
  }, {
    title: "Suporte",
    links: [{
      label: "Central de Ajuda",
      href: "/contato"
    }, {
      label: "Denúncias",
      href: "/seguranca"
    }, {
      label: "Contato",
      href: "/contato"
    }, {
      label: "FAQ",
      href: "/contato"
    }]
  }, {
    title: "Legal",
    links: [{
      label: "Política de Privacidade",
      href: "#"
    }, {
      label: "Termos de Uso",
      href: "#"
    }, {
      label: "LGPD",
      href: "#"
    }, {
      label: "Diretrizes da Comunidade",
      href: "/seguranca"
    }]
  }];

  const socialLinks = [{
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }, {
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }, {
    icon: Mail,
    href: "#",
    label: "E-mail"
  }];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      // Handle anchor links or external links
      return;
    }
    navigate(href);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 rounded-full bg-gradient-trans"></div>
                <span className="text-2xl font-bold">Transcare</span>
              </div>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Uma plataforma segura e acolhedora para a comunidade trans navegar sua jornada com suporte, informação e cuidado.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(social.href, '_blank')}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-trans-pink/30 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-4 text-trans-pink">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-gray-300 hover:text-trans-blue transition-colors duration-200 text-sm text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-trans-pink/10 to-trans-blue/10 rounded-lg p-6 mb-8 border border-white/10">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-trans-lavender">Nossa Missão</h3>
              <p className="text-gray-300 text-sm max-w-3xl mx-auto leading-relaxed">
                Criar um espaço digital seguro, inclusivo e informativo onde pessoas trans possam acessar recursos confiáveis sobre terapia hormonal, 
                conectar-se com uma comunidade acolhedora e organizar sua jornada de cuidados de saúde com autonomia e dignidade.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                © 2024 TransCuidado. Todos os direitos reservados.
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span>Feito com</span>
                <Heart className="w-4 h-4 text-trans-pink fill-current" />
                <span>pela comunidade trans</span>
              </div>
              
              <div className="text-sm text-gray-400">
                Versão 1.0.0
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-trans-blue">Recursos Importantes</h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <button onClick={() => window.open('#', '_blank')} className="text-gray-300 hover:text-trans-pink transition-colors">
                  Centro de Referência LGBT+
                </button>
                <span className="text-gray-600">•</span>
                <button onClick={() => window.open('#', '_blank')} className="text-gray-300 hover:text-trans-pink transition-colors">
                  SUS Trans
                </button>
                <span className="text-gray-600">•</span>
                <button onClick={() => window.open('#', '_blank')} className="text-gray-300 hover:text-trans-pink transition-colors">
                  Defensoria Pública
                </button>
                <span className="text-gray-600">•</span>
                <button onClick={() => window.open('#', '_blank')} className="text-gray-300 hover:text-trans-pink transition-colors">
                  ANTRA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
