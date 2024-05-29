import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function HistoryDialog(props: any) {
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/public/item/history/${props.itemId}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("There was an error fetching item history!", error);
      }
    };

    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen, props.itemId]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>{props.button}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Histórico de Alterações</AlertDialogTitle>
            <AlertDialogDescription>
              Detalhes das alterações realizadas neste registro.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data de Alteração</TableHead>
                <TableHead>Dados Modificados</TableHead>                
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item: any, index) => (
                <TableRow key={index}>
                  <TableCell>{formatTimestamp(item.timestamp)}</TableCell>
                  <TableCell>{JSON.stringify(item.changed_fields)}</TableCell>                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
