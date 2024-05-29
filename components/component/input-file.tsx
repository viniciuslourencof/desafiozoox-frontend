import React from "react";

export function InputFile(props: any) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtém o primeiro arquivo selecionado

    // Verifica se há um arquivo selecionado antes de chamar a função de manipulação de upload
    if (file) {
      props.handleFileUpload(file);
    }
  };

  const handleInputClick = () => {
    // Simular o clique no elemento de entrada de arquivo
    const inputElement = document.getElementById("fileInput");
    if (inputElement) {
      inputElement.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // Obtém o primeiro arquivo arrastado e solto

    // Verifica se há um arquivo antes de chamar a função de manipulação de upload
    if (file) {
      props.handleFileUpload(file);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-4 p-4 md:p-6"> {/* Alterado para ocupar quase toda a largura da tela */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Carregar arquivo CSV</h2>
      </div>
      <div
        className="group relative flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900"
        onClick={handleInputClick}
        onDragOver={handleDragOver} // Adiciona manipulador de evento para 'dragover'
        onDrop={handleDrop} // Adiciona manipulador de evento para 'drop'
      >
        <input
          accept=".csv"
          id="fileInput"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          type="file"
          onChange={handleInputChange}
        />
        <div className="z-20 flex flex-col items-center space-y-2 text-center text-gray-500 transition-colors group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
          <UploadIcon className="h-8 w-8" />
          <p>
            Arraste e solte um arquivo CSV ou clique para selecionar um arquivo.
          </p>
        </div>
      </div>
    </div>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}