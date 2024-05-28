import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputText(props: any) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={props.field}>{props.label}</Label>
      <Input
        type={props.type}
        id={props.field}
        placeholder={props.label}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
