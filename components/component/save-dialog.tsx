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

export function SaveDialog(props: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edição de Cadastro</AlertDialogTitle>
          <AlertDialogDescription>
            Atualize os dados cadastrais
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputText
          label="Nome"
          field="nome"
          type="text"
          value={props.data.nome}
        ></InputText>
        <InputText
          label="Data de Nascimento"
          field="data_nascimento"
          type="date"
          value={props.data.data_nascimento}
        ></InputText>
        <InputText
          label="Gênero"
          field="genero"
          type="text"
          value={props.data.genero}
        ></InputText>
        <InputText
          label="Nacionalidade"
          field="nacionalidade"
          type="text"
          value={props.data.nacionalidade}
        ></InputText>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={props.save}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
