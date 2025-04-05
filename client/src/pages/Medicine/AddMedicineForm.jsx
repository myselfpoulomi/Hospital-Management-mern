import { useState, useEffect } from "react";
import axios from "axios";
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

const AddMedicineForm = ({ isOpen, onClose, onMedicineAdded }) => {  // Get the callback as a prop
  const [date, setDate] = useState(undefined);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("expiryDate", { required: "Expiry date is required" });
    register("category", { required: "Category is required" });
    register("status", { required: "Status is required" });
  }, [register]);

  useEffect(() => {
    if (date) setValue("expiryDate", date);
    if (category) setValue("category", category);
    if (status) setValue("status", status);
  }, [date, category, status, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setDate(undefined);
      setCategory("");
      setStatus("");
    }
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    if (isNaN(Number(data.stock)) || Number(data.stock) <= 0) {
      toast({ title: "Error", description: "Stock must be a positive number." });
      return;
    }

    const formattedData = {
      medicineId: data.id,
      medicineName: data.name,
      category: data.category,
      stockQuantity: Number(data.stock),
      status: data.status,
      expiryDate: new Date(data.expiryDate).toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:4000/Medicine/addMedicine", formattedData, {
        headers: { "Content-Type": "application/json" },
      });

      toast({
        title: "Medicine Added",
        description: `${data.name} has been added to inventory.`,
      });

      // Pass the newly added medicine back to the parent
      onMedicineAdded(response.data);  // Call the callback with the new medicine

      reset();
      setDate(undefined);
      setCategory("");
      setStatus("");
      onClose();
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast({
        title: "Failed to Add Medicine",
        description: error.response?.data?.message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    reset();
    setDate(undefined);
    setCategory("");
    setStatus("");
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
              <Input
                id="id"
                placeholder="e.g., MED-004"
                {...register("id", { required: "ID is required" })}
              />
              {errors.id && <p className="text-sm text-red-500">{errors.id.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Medicine Name*</Label>
              <Input
                id="name"
                placeholder="e.g., Ibuprofen 200mg"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select onValueChange={setCategory} value={category}>
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
              <Select onValueChange={setStatus} value={status}>
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
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.expiryDate && (
                <p className="text-sm text-red-500">{errors.expiryDate.message}</p>
              )}
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
