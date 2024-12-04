export interface Customer {
  id?: string;
  nome_cliente?: string;
  cpf?: string;
}

export interface Products {
  id?: string;
  nome_produto?: string;
  preco?: number;
}

export type ItemType = 'cliente' | 'produto';