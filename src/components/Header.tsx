
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Users, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Sobre TH', href: '/sobre-th' },
    { label: 'Agenda', href: '/agenda', icon: Calendar },
    { label: 'Comunidade', href: '/comunidade', icon: Users },
    { label: 'Eventos', href: '/eventos' },
    { label: 'Segurança', href: '/seguranca' },
    { label: 'Contato', href: '/contato' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-trans-pink/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-trans"></div>
            <span className="text-2xl font-bold bg-gradient-trans bg-clip-text text-transparent">
              TransCuidado
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center space-x-1 text-gray-600 hover:text-trans-purple transition-colors duration-200"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-trans-pink text-trans-purple hover:bg-trans-pink/10">
              Entrar
            </Button>
            <Button className="bg-gradient-trans hover:opacity-90 text-white">
              <User className="w-4 h-4 mr-2" />
              Criar Conta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-trans-purple" />
            ) : (
              <Menu className="w-6 h-6 text-trans-purple" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-trans-pink/20">
            <div className="flex flex-col space-y-4 mt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-trans-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-trans-pink text-trans-purple">
                  Entrar
                </Button>
                <Button className="bg-gradient-trans text-white">
                  Criar Conta
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
