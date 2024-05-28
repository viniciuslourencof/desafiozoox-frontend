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

    fetchHistory();
  }, [props.itemId]);

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{props.button}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Histórico de Alterações</AlertDialogTitle>
            <AlertDialogDescription>
              Dados das alterações realizadas neste registro
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <TableCell>Data de Alteração</TableCell>
                  <TableCell>Dados Antigos</TableCell>
                  <TableCell>Dados Novos</TableCell>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item: any, index) => (
                <TableRow key={index}>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>{JSON.stringify(item.old_data)}</TableCell>
                  <TableCell>{JSON.stringify(item.new_data)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AlertDialogFooter>
            <AlertDialogAction>Fechar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
