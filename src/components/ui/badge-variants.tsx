import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "open" | "in-progress" | "completed" | "disputed" | "cancelled";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    open: { label: "Open", variant: "secondary" as const, className: "" },
    "in-progress": { label: "In Progress", variant: "default" as const, className: "" },
    completed: { label: "Completed", variant: "default" as const, className: "bg-success text-success-foreground" },
    disputed: { label: "Disputed", variant: "destructive" as const, className: "" },
    cancelled: { label: "Cancelled", variant: "outline" as const, className: "" },
  };

  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant} 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};