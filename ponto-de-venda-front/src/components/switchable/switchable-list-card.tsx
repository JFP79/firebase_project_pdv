'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, Pencil } from 'lucide-react'

import { Customer, ItemType, Products, Cupom } from '@/types/type'
import { ItemModal } from '../modal/item-modal'
import { getCustomers } from '@/services/customer'
import { getProducts } from '@/services/products'
import { getPdvs } from '@/services/pvd'
import { CupomModal } from '../modal/cupon-modal'



export default function SwitchableListCard() {
  const [customer, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Products[]>([])
  const [cupons, setCupom] = useState<Cupom[]>([])

  const [error, setError] = useState<string | null>(null)
  const [itemType, setItemType] = useState<ItemType>('cliente')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editCustomer, setEditCustomer] = useState<Customer>()
  const [editProduct, setEditProduct] = useState<Products>()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const handleEditCustomer = (item: Customer) => {
    setEditCustomer(item)
    setIsModalOpen(true)
  }

  const handleEditProduct = (item: Customer) => {
    setEditProduct(item)
    setIsModalOpen(true)
  }


  useEffect(() => {
    const fetchCustomersAndProducts = async () => {
      setIsLoading(true);
      try {
        const customers = await getCustomers();
        const products = await getProducts();
        const cupons = await getPdvs();

        setIsLoading(false);
        setCustomers(customers);
        setProducts(products);
        setCupom(cupons);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Error fetching customers');
      }
    }

    fetchCustomersAndProducts();
  }, [])


  console.log(cupons.map((cupom) => cupom.cupom.itens.map((item) => item)));
  
  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex flex-row w-full justify-center items-center">
          <div className="flex w-full rounded-lg border border-input overflow-hidden">
             <Button
              variant={itemType === 'cliente' ? "secondary" : "ghost"}
              className="rounded-none flex-1"
              onClick={() => setItemType('cliente')}
            >
              Cliente
            </Button>
            <Button
              variant={itemType === 'produto' ? "secondary" : "ghost"}
              className="rounded-none flex-1"
              onClick={() => setItemType('produto')}
            >
              Produtos
            </Button>
            <Button
              variant={itemType === 'cupom' ? "secondary" : "ghost"}
              className="rounded-none flex-1"
              onClick={() => setItemType('cupom')}
            >
              Cupom
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : itemType === 'cliente' ? (
          <>
            <ul className="space-y-2">
              {customer.map(item => (
                <li key={item.id} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <div className="flex flex-row items-center justify-between w-full">
                    <span className="pl-2">{item?.nome_cliente}</span>
                    <div className="flex flex-row justify-end gap-2 pr-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditCustomer(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className='hover:bg-red-600 hover:text-white'>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-4" onClick={handleAdd}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar {itemType}
            </Button>
          </>
        ) : itemType === 'produto' ? (
          <>
            <ul className="space-y-2">
              {products.map(item => (
                <li key={item.id} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <div className="flex flex-row items-center justify-between w-full">
                    <span className="pl-2">{item?.nome_produto}</span>
                    <div className="flex flex-row justify-end gap-2 pr-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditProduct(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className='hover:bg-red-600 hover:text-white'>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-4" onClick={handleAdd}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicione um novo {itemType}
            </Button>
          </>
        ) : itemType === 'cupom' ? (
          <>
            <Button className="w-full mt-4" onClick={handleAdd}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicione um novo {itemType}
            </Button>
          </> 
        ) : <p>Nem um item encontrado!</p>} 
      </CardContent>
      {itemType !== 'cupom' ? (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={itemType === 'cliente' ? editCustomer : editProduct}
          itemType={itemType}
        />
      ) : (
        <CupomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          customers={customer}
          products={products}
        />
      )}
    </Card>
  )
}

