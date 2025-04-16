import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  const StaffDetailsDialog = ({ open, onOpenChange, staff }) => {
    if (!staff) return null;
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Staff Details</DialogTitle>
          </DialogHeader>
  
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Name:</p>
                <p>{staff.name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Gender:</p>
                <p>{staff.gender}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Age:</p>
                <p>{staff.age}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Contact:</p>
                <p>{staff.contact || "N/A"}</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700">Staff Type:</p>
                <p>{staff.staffType}</p>
              </div>
              
            </div>
          </div>
  
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default StaffDetailsDialog;
  