import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Customer, ItemType, Products } from '@/types/type'
import { createCustomer, createProduct } from '@/utils/api/api'

type ItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: Customer | Products;
  itemType: ItemType;
}

export function ItemModal({ isOpen, onClose, item, itemType }: ItemModalProps) {
  const { register, handleSubmit, reset } = useForm<Customer>({
    defaultValues: item || {}
  });
  const { 
    register: registerProduct, 
    handleSubmit: handleSubmitProduct, 
    reset: resetProduct } = useForm<Products>({
    defaultValues: item || {}
  });
  
  useEffect(() => {
    reset(item || {});
    resetProduct(item || {});
  }, [item, reset, resetProduct]);

  const onSubmitCustomer = handleSubmit((data) => {
    createCustomer(data).then((response) => {
      if(response.status === 201) {
        window.location.reload();
      }
    }).catch((error) => {
      console.error(error);
    })
    onClose();
  });

  const onSubmitProduct = handleSubmitProduct((data) => {
    createProduct(data).then((response) => {
      if  (response.status === 201) window.location.reload();
    }).catch((error) => {
      console.error(error);
    })
    onClose();
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'Editar' : 'Adiconar'} {itemType}</DialogTitle>
        </DialogHeader>
        <form onSubmit={itemType === 'cliente' ? onSubmitCustomer : onSubmitProduct}>
          <div className="grid gap-4 py-4">
            {itemType === 'cliente' && (
              <>
                <div className="flex flex-col w-full gap-4">
                  <Label htmlFor="name" className="text-left">Nome do Cliente</Label>
                  <Input
                    id="nome_cliente"
                    {...register("nome_cliente", { required: {message: "Nome é obrigatorio", value: true} })}
                    className="col-span-3"
                    />
                  </div>
                <div className="flex flex-col w-full gap-4">
                  <Label className="text-left">CPF do cliente</Label>
                  <Input
                    id="cpf"
                    {...register("cpf", { required: "Cpf é obrigatorio" })}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
            
            {itemType === 'produto' && (
              <>
                <div className="flex flex-col w-full gap-4">
                  <Label htmlFor="nome_produto" className="text-left">Nome do produto</Label>
                  <Input
                    id="nome_produto"
                    type="text"
                    {...registerProduct("nome_produto", { required: "Nome do produto é obrigatorio"})}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col w-full gap-4">
                  <Label htmlFor="preco" className="text-left">Preço do Produto</Label>
                  <Input
                    id="preco"
                    type="number"
                    {...registerProduct("preco", { required: "Informe o preço!"})}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

