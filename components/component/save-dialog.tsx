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
import { useState, useEffect } from "react";
import { formatDate } from "@/utils/formatDate";

export function SaveDialog(props: any) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");

  useEffect(() => {
    if (props.data) {
      setNome(props.data.nome || "");
      setDataNascimento(formatDate(props.data.data_nascimento) || "");
      setGenero(props.data.genero || "");
      setNacionalidade(props.data.nacionalidade || "");
    }
  }, [props.data]);

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
    <>
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
            <AlertDialogAction onClick={handleSave}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
