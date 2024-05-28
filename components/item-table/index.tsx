"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { HistoryDialog } from "../component/history-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ItemTable() {
  //CRUD
  const [users, setUsers] = useState<any[]>([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/public/items");

      if (response.data) {
        const usersWithId = response.data.map((doc: any) => ({
          id: doc.id,
          ...doc,
        }));
        setUsers(usersWithId);
      }
    } catch (error) {
      console.error("There was an error fetching the items!", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/public/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.data) {
          const usersWithId = response.data.data.map((doc: any) => ({
            id: doc.id,
            ...doc,
          }));
          setUsers(usersWithId);
        }
      } catch (error) {
        console.error("There was an error uploading the file!", error);
      }
    }
  };

  const handleEdit = async (updatedUser: any) => {
    const updatedData = {
      nome: updatedUser.nome,
      data_nascimento: updatedUser.data_nascimento
        ? new Date(updatedUser.data_nascimento).toISOString().split("T")[0]
        : null,
      genero: updatedUser.genero,
      nacionalidade: updatedUser.nacionalidade,
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/public/items/${updatedUser.id}`,
        updatedData
      );
      console.log("Item updated successfully:", response.data);
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/public/items/${id}`);
      // Remover o usuário da lista localmente após a exclusão bem-sucedida
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const handleAdd = async (newUser: any) => {
    const newData = {
      nome: newUser.nome,
      data_nascimento: newUser.data_nascimento
        ? new Date(newUser.data_nascimento).toISOString().split("T")[0]
        : null,
      genero: newUser.genero,
      nacionalidade: newUser.nacionalidade,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/public/items",
        newData
      );
      console.log("Item added successfully:", response.data);
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // CRUD

  // FILTROS //

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    column: "",
    value: "",
  });

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const filterAndSearchItems = () => {
    let filteredItems = users;

    // Aplicar busca por palavras-chave
    if (searchQuery) {
      filteredItems = filteredItems.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Aplicar filtro por critério
    if (filterCriteria.column && filterCriteria.value) {
      filteredItems = filteredItems.filter((item) =>
        String(item[filterCriteria.column])
          .toLowerCase()
          .includes(filterCriteria.value.toLowerCase())
      );
    }

    return filteredItems;
  };

  const filteredItems = filterAndSearchItems();

  // FILTROS

  // EXPORTACAO

  const exportToCSV = () => {
    const filteredItems = filterAndSearchItems();

    const header = Object.keys(filteredItems[0]).join(",");
    const csv = [
      header,
      ...filteredItems.map((item) =>
        Object.values(item)
          .map((value) =>
            typeof value === "string" && value.includes(",")
              ? `"${value}"`
              : value
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // EXPORTACAO

  return (
    <div>
      <InputFile handleFileUpload={handleFileUpload}></InputFile>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          gap: "1rem",
          backgroundColor: "ButtonFace",
        }}
      >
        <div>
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: "40vw" }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <select
            name="column"
            onChange={handleFilterChange}
            className=" bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione uma coluna</option>
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
            style={{ width: "20%" }}
          />
          <Button onClick={exportToCSV}>Exportar para CSV</Button>
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
          {filteredItems.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.data_nascimento}</TableCell>
              <TableCell>{user.genero}</TableCell>
              <TableCell>{user.nacionalidade}</TableCell>
              <TableCell>{user.data_criacao}</TableCell>
              <TableCell>{user.data_atualizacao}</TableCell>
              <TableCell>
                <div style={{ display: "flex", gap: "8px" }}>
                  <SaveDialog
                    button={<Button>Novo</Button>}
                    save={handleAdd}
                    title="Novo Cadastro"
                    description="Preencha os dados do novo cadastro"
                    data={{}}
                  />

                  <SaveDialog
                    button={<Button>Editar</Button>}
                    save={handleEdit}
                    title="Atualização de Cadastro"
                    description="Preencha os dados atualizados do cadastro selecionado"
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
