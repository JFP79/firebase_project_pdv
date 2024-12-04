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

export interface Pdv {
  id: string;
  clienteId: string; 
  produtoIds: string[];
  valorPago: number;
  valorTotal: number;
  troco: number;
}


export interface Cupom {
  cupom: {
    id: string;
    cliente: Customer[]; 
    itens: Products[];
    valorPago: number;
    valorTotal: number;
    troco: number;
  }
}


export type ItemType = 'cliente' | 'produto' | 'cupom';