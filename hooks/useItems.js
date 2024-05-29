import { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "@/utils/formatDate"; 

export const useItems = () => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/public/items");
            if (response.data) {
                const itemsWithId = response.data.map((item) => ({
                    id: item.id,
                    ...item,
                    data_nascimento: formatDate(item.data_nascimento),
                    data_criacao: item.data_criacao,
                    data_atualizacao: item.data_atualizacao,
                }));
                setItems(itemsWithId);
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleFileUpload = async (file) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);    
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/public/upload",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                if (response.data.data) {
                    const itemsWithId = response.data.data.map((item) => ({
                        id: item.id,
                        ...item,
                        data_nascimento: formatDate(item.data_nascimento),
                        data_criacao: item.data_criacao,
                        data_atualizacao: item.data_atualizacao,
                    }));
                    setItems(itemsWithId);
                }
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };
    

    const handleAdd = async (newItem) => {

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        const newData = {
            nome: newItem.nome,
            data_nascimento: newItem.data_nascimento
                ? formatDate(newItem.data_nascimento)
                : null,
            genero: newItem.genero,
            nacionalidade: newItem.nacionalidade,
            data_criacao: year + '-' + month + '-' + dt
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

    const handleEdit = async (updatedItem) => {        

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        const updatedData = {
            nome: updatedItem.nome,
            data_nascimento: updatedItem.data_nascimento
                ? formatDate(updatedItem.data_nascimento)
                : null,
            genero: updatedItem.genero,
            nacionalidade: updatedItem.nacionalidade,
            data_atualizacao: year + '-' + month + '-' + dt
        };        

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/public/items/${updatedItem.id}`,
                updatedData
            );
            console.log("Item updated successfully:", response.data);
            fetchItems();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/public/items/${id}`);
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return {
        items,
        fetchItems,
        handleFileUpload,
        handleAdd,
        handleEdit,
        handleDelete,
    };
};
