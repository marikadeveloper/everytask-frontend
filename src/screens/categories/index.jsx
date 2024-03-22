import {
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Pencil, Trash } from "../../assets/icons";
import { Button } from "../../components/button";
import { Input } from "../../components/input/index";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
} from "../../utils/category";

function CategoriesScreen() {
  const { categories } = useCategories();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddClick = () => {
    setSelectedCategory(null);
    setCategoryName("");
    onOpen();
  };

  const handleModalClose = () => {
    onOpenChange(false); // Use onOpenChange from useDisclosure
  };

  // Use this function to confirm the modal
  const handleModalConfirm = () => {
    if (selectedCategory) {
      updateCategory({ ...selectedCategory, name: categoryName });
    } else {
      createCategory({ name: categoryName });
    }
    onOpenChange(false); // Use onOpenChange from useDisclosure
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    onOpen();
  };

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "actions",
      label: "Actions",
      // Render function for actions column, if needed
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h1>Categories</h1>
        <Button onClick={handleAddClick}>Add category</Button>
      </div>
      <Table aria-label="Example table with categories">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={categories}>
          {(item) => (
            <TableRow key={item.id}>
              {" "}
              {/* Make sure each category has a unique 'id' */}
              {(columnKey) => {
                if (columnKey === "actions") {
                  return (
                    <TableCell>
                      <Button onClick={() => handleEditClick(item)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteClick(item)}>
                        Delete
                      </Button>
                    </TableCell>
                  );
                }
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton
        aria-labelledby="modal-title"
      >
        <ModalHeader>
          <span id="modal-title">
            {selectedCategory ? "Edit Category" : "Add Category"}
          </span>
        </ModalHeader>
        <ModalBody>
          <Input
            clearable
            underlined
            label="Category name"
            initialValue=""
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button auto onClick={handleModalConfirm}>
            {selectedCategory ? "Save" : "Add"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CategoriesScreen;

/**
 * 🤔Alberto:
 *
 * - crea un componente CategoriesScreen
 * - nel file authenticated-app.jsx, aggiungi la route per il componente CategoriesScreen (/categories) sennò non riesci a vedere il tuo componente
 * - il componente deve avere uno state
 * - lo state deve contenere un array di categorie
 * - le categorie si possono prendere così:
 *      const { categories } = useCategories();
 *      useCategories lo importi da utils/categories
 *
 * - il componente deve avere un tasto "Add category" a destra del titolo
 *    - al click su "Add category" deve comparire una modale con un input per il nome della categoria
 *    - la modale deve avere due bottoni: "Cancel" e "Add"
 *      - "Cancel" chiude la modale
 *      - "Add" chiude la modale e crea la categoria
 *        - per creare la categoria devi usare: const { mutate } = useCreateCategory();
 *        - useCreateCategory lo importi da utils/category
 *
 * - il componente deve mostrare una tabella con le categorie
 *    componente della tabella da usare: https://nextui.org/docs/components/table#dynamic
 *    la tabella deve avere le seguenti colonne:
 *    - name (nome della categoria)
 *    - actions (azioni possibili: modifica, elimina, rappresentate da 2 icone)
 *      - per le actions trovi un esempio qui: https://nextui.org/docs/components/table#dynamic
 *      - le icone per le actions sono queste, da importare da assets/icons/index:
 *        - <Trash />
 *        - <Pencil />
 *      - le icone devono essere cliccabili
 *      - azioni:
 *        - al click su ELIMINA deve comparire una modale dove chiedi conferma di eliminare la categoria:
 *          - testo: "Are you sure you want to delete this category?"
 *          - due bottoni: "Discard" e "Confirm deletion"
 *            - "Discard" chiude la modale
 *            - "Confirm deletion" chiude la modale (più tardi vediamo come fare a eliminare la categoria)
 *        - al click su MODIFICA deve comparire una modale con un input per modificare il nome della categoria
 *          - la modale deve avere due bottoni: "Cancel" e "Save"
 *          - "Cancel" chiude la modale
 *          - "Save" chiude la modale e modifica la categoria
 *            - per modificare la categoria devi usare: const { mutate } = useUpdateCategory();
 *            - useUpdateCategory lo importi da utils/category
 *          - riesci ad utilizzare la stessa modale per creare e modificare la categoria? sono MOLTO simili
 *
 *
 * LINK UTILI:
 * - https://nextui.org/docs/components/modal
 * - https://nextui.org/docs/components/table#dynamic
 * - https://nextui.org/docs/components/table#custom-cells
 */
