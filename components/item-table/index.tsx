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

import { InputFile } from "@/components/component/input-file";
import { DeleteDialog } from "@/components/component/delete-dialog";
import { SaveDialog } from "@/components/component/save-dialog";

export function ItemTable() {
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

  const handleEdit = async (user: any) => {
    console.log("Editing user:", user);

    // Prepare the data you want to update
    const updatedData = {
      nome: user.nome,
      data_nascimento: user.data_nascimento,
      genero: user.genero,
      nacionalidade: user.nacionalidade,
      data_atualizacao: user.data_atualizacao,
    };

    try {
      const response = await axios.put(`/api/items/${user.id}`, updatedData);
      console.log("Item updated successfully:", response.data);
      // Aqui você pode adicionar lógica adicional, como atualizar a interface de usuário
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

  return (
    <div>
      <InputFile handleFileUpload={handleFileUpload}></InputFile>

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
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.data_nascimento}</TableCell>
              <TableCell>{user.genero}</TableCell>
              <TableCell>{user.nacionalidade}</TableCell>
              <TableCell>{user.data_criacao}</TableCell>
              <TableCell>{user.data_atualizacao}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(user)}>Novo</Button>
                <SaveDialog
                  button={<Button>Editar</Button>}
                  save={handleEdit(user)}
                  data={user}
                ></SaveDialog>
                <DeleteDialog
                  button={<Button>Excluir</Button>}
                  delete={() => handleDelete(user.id)}
                ></DeleteDialog>
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
