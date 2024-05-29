"use client"
import React, { useState } from "react";
import { useItems } from "@/hooks/useItems";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/component/input-file";
import { DeleteDialog } from "@/components/component/delete-dialog";
import { SaveDialog } from "@/components/component/save-dialog";
import { HistoryDialog } from "@/components/component/history-dialog";
import { filterAndSearchItems } from "@/utils/filterAndSearchItems";
import { exportToCSV } from "@/utils/exportToCSV";
import { formatDate } from "@/utils/formatDate";

export function ItemTable() {
  const { items, handleFileUpload, handleAdd, handleEdit, handleDelete } = useItems();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    column: "",
    value: "",
  });

  const handleSearchChange = (e: any) => setSearchQuery(e.target.value);
  const handleFilterChange = (e: any) =>
    setFilterCriteria({ ...filterCriteria, [e.target.name]: e.target.value });

  const filteredItems = filterAndSearchItems(items, searchQuery, filterCriteria);

  return (
    <div>
      <InputFile handleFileUpload={handleFileUpload} />
      <div className="flex justify-between p-2 bg-zinc-100">
        <div className="w-1/2 flex gap-2">
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select
            name="column"
            onChange={handleFilterChange}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="nome">Nome</option>
            <option value="data_nascimento">Data de Nascimento</option>
            <option value="genero">Gênero</option>
            <option value="nacionalidade">Nacionalidade</option>
          </select>
          <Input
            type="text"
            name="value"
            placeholder="Valor do filtro"
            onChange={handleFilterChange}
            className="w-1/4"
          />
        </div>
        <div className="w-fit flex gap-2">
          <SaveDialog
            button={<Button>Novo Registro</Button>}
            save={handleAdd}
            title="Novo Cadastro"
            description="Preencha os dados do novo cadastro."
            data={{}}
          />
          <Button onClick={() => exportToCSV(filteredItems)}>
            Exportar para CSV
          </Button>
        </div>
      </div>
      <Table>
        <TableCaption>Dados dos Usuários.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Gênero</TableHead>
            <TableHead>Nacionalidade</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Data de Atualização</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((user: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{formatDate(user.data_nascimento)}</TableCell>
              <TableCell>{user.genero}</TableCell>
              <TableCell>{user.nacionalidade}</TableCell>
              <TableCell>{user.data_criacao}</TableCell>
              <TableCell>{user.data_atualizacao}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <SaveDialog
                    button={<Button>Editar</Button>}
                    save={handleEdit}
                    title="Atualização de Cadastro"
                    description="Preencha os dados atualizados do cadastro selecionado."
                    data={user}                    
                  />
                  <DeleteDialog
                    button={<Button>Excluir</Button>}
                    delete={() => handleDelete(user.id)}
                  />
                  <HistoryDialog
                    button={<Button>Histórico</Button>}
                    itemId={user.id}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>{/* Footer content can go here if needed */}</TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
