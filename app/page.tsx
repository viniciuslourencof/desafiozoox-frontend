import { ItemTable } from "@/components/component/item-table";
import { ToastProviderWrapper } from "@/hooks/useToast";

export default function Home() {
  return (
    <ToastProviderWrapper>
      <div>
        <ItemTable />
      </div>
    </ToastProviderWrapper>
  );
}
