import { Customer, Pdv, Products } from "@/types/type";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

type CupomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  products: Products[];
}

export function CupomModal({ isOpen, onClose, customers, products }: CupomModalProps) {
  const { control, handleSubmit, reset, watch } = useForm<Pdv>();
  const selectedProducts = watch("produtoIds");

  useEffect(() => {
    reset();
  }, [reset, isOpen]);

  const onSubmit: SubmitHandler<Pdv> = (data) => {
    console.log(data.produtoIds.map((product) => products.find((p) => p.id === product)?.id || ""));
    onClose();
    /* createPdv({
      ...data,
      produtoIds: data.produtoIds.map((product) => products.find((p) => p.id === product)?.id || "")
    }).then((response) => {
      if (response.status === 201) {
        onSave(response.data);
        onClose();
      }
    }).catch((error) => {
      console.error(error);
    }); */
  };

const totalPrice = selectedProducts
  ? products
      .filter(product => selectedProducts.includes(product.id || ""))
      .reduce((total, product) => total + (product.preco || 0), 0)
  : 0;

const valorPago = watch("valorPago") || 0;

const troco = valorPago >= totalPrice ? valorPago - totalPrice : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerar Cupom</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col w-full gap-4">
              <Label htmlFor="customerId" className="text-left">Cliente</Label>
              <Controller
                name="clienteId"
                control={control}
                rules={{ required: "Customer is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id || ""}>
                          {customer.nome_cliente}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col w-full gap-4">
              <Label htmlFor="produto.id" className="text-left">Produto</Label>
              <Controller
                name="produtoIds"
                control={control}
                rules={{ required: "Produto is required" }}
                render={({ field }) => (
                  <>                  
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id || ""}>
                            {product.nome_produto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.value && (
                      <div className="flex flex-col w-full gap-4">
                        <Label htmlFor="produto.preco" className="text-left">Preço</Label>
                        <input
                          id="produto.preco"
                          type="number"
                          value={products.find((product) => product.id === field.value.toString())?.preco || ""}
                          readOnly
                          className="col-span-3 border p-2 rounded bg-gray-100"
                        />
                      </div>
                    )}
                  </>
                )}
              />              
            </div>
            <div className="flex flex-col w-full gap-4">
              <Label htmlFor="valorPago" className="text-left">Valor pago</Label>
              <Controller
                name="valorPago"
                control={control}
                render={({ field }) => (
                  <Input
                    id="valorPago"
                    type="number"
                    {...field}
                    value={field.value || ""}
                    className="col-span-3"
                  />
                )}
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <Label htmlFor="troco" className="text-left">Troco</Label>
              <Controller
                name="troco"
                control={control}
                render={({ field }) => (
                  <Input
                    id="troco"
                    type="number"
                    {...field}
                    readOnly
                    value={troco}
                    className="col-span-3"
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Gerar Cupom</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}