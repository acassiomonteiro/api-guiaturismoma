// Criação de interface para Atrativos e Destinos

export interface Atrativo {
  id: number;
  name: string;
  tipo: string;
  description: string;
  dicas: string;
  destino_id: number;
}

export interface Destino {
  id: number;
  name: string;
  description: string;
  localizacao: string;
  imagem: string;
  imagem2: string;
  imagem3: string;
  imagem4: string;
  atrativos: Atrativo[];
}
