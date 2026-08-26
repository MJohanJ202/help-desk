import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/get-initials";

interface AvatarBadgeProps {
  name: string | null;
  avatar_url?: string;
}

export const AvatarBadge = ({ name, avatar_url }: AvatarBadgeProps) => {
  return (
    <Badge className="gap-2 min-h-9 font-bold">
      <Avatar>
        <AvatarImage src={avatar_url ?? ""} />
        <AvatarFallback className="text-neutral-500">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {name}
    </Badge>
  );
};
