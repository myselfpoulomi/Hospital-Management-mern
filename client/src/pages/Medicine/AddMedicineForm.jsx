import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";

const AddMedicineForm = ({ isOpen, onClose }) => {
  const [date, setDate] = useState(undefined);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!data.expiryDate) {
      toast({ title: "Error", description: "Expiry date is required." });
      return;
    }

    if (isNaN(Number(data.stock)) || Number(data.stock) <= 0) {
      toast({ title: "Error", description: "Stock must be a positive number." });
      return;
    }

    console.log("Form submitted:", data);

    toast({
      title: "Medicine Added",
      description: `${data.name} has been added to inventory.`,
    });

    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Medicine</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Medicine ID*</Label>
              <Input id="id" placeholder="e.g., MED-004" {...register("id", { required: "ID is required" })} />
              {errors.id && <p className="text-sm text-red-500">{errors.id.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Medicine Name*</Label>
              <Input id="name" placeholder="e.g., Ibuprofen 200mg" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Analgesics">Analgesics</SelectItem>
                  <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                  <SelectItem value="Antihypertensives">Antihypertensives</SelectItem>
                  <SelectItem value="Antivirals">Antivirals</SelectItem>
                  <SelectItem value="Vaccines">Vaccines</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity*</Label>
              <Input
                id="stock"
                type="number"
                min="1"
                placeholder="e.g., 500"
                {...register("stock", { required: "Stock quantity is required" })}
              />
              {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status*</Label>
              <Select onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="expiryDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      newDate && setValue("expiryDate", newDate);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Medicine
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicineForm;
