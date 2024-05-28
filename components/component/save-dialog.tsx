import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { InputText } from "@/components/component/input-text";
import React, { useState } from "react";

export function SaveDialog(props: any) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [nome, setNome] = useState(props.data?.nome || "");
  const [dataNascimento, setDataNascimento] = useState(
    formatDate(props.data?.data_nascimento)
  );
  const [genero, setGenero] = useState(props.data?.genero || "");
  const [nacionalidade, setNacionalidade] = useState(
    props.data?.nacionalidade || ""
  );

  const handleSave = () => {
    props.save({
      id: props.data?.id,
      nome,
      data_nascimento: dataNascimento,
      genero,
      nacionalidade,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <InputText
          label="Nome"
          field="nome"
          type="text"
          value={nome}
          onChange={(e: any) => setNome(e.target.value)}
        ></InputText>
        <InputText
          label="Data de Nascimento"
          field="data_nascimento"
          type="date"
          value={dataNascimento}
          onChange={(e: any) => setDataNascimento(e.target.value)}
        ></InputText>
        <InputText
          label="Gênero"
          field="genero"
          type="text"
          value={genero}
          onChange={(e: any) => setGenero(e.target.value)}
        ></InputText>
        <InputText
          label="Nacionalidade"
          field="nacionalidade"
          type="text"
          value={nacionalidade}
          onChange={(e: any) => setNacionalidade(e.target.value)}
        ></InputText>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
