
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <Card className="border-trans-pink/20 bg-white/80 backdrop-blur-sm">
      <CardContent className="text-center py-12">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Nenhum post encontrado
        </h3>
        <p className="text-gray-500">
          Seja o primeiro a compartilhar algo com a comunidade!
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
