import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Pencil, Trash } from "../../assets/icons";
import { Button, IconButton } from "../../components/button";
import { Input } from "../../components/input/index";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../utils/category";
import "./styles.scss";

function CategoriesScreen() {
  const { categories } = useCategories();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
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

  const handleModalConfirm = () => {
    if (selectedCategory) {
      // Update category
      updateCategory(
        { id: selectedCategory.id, name: categoryName },
        {
          onSuccess: () => {
            // This is where you could close the modal and reset state
            onOpenChange(false);
            // Possibly refetch categories or update local state
          },
        },
      );
    } else {
      // Create new category
      createCategory(
        { name: categoryName },
        {
          onSuccess: () => {
            // This is where you could close the modal and reset state
            onOpenChange(false);
            // Possibly refetch categories or update local state
          },
        },
      );
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    onOpen();
  };

  const handleDeleteClick = (category) => {
    deleteCategory(category.id, {
      onSuccess: () => {
        // Handle successful deletion
        // Optionally update UI or refetch categories
      },
    });
  };

  const columns = [
    { name: "Name", uid: "name" },
    { name: "Actions", uid: "actions" },
  ];

  return (
    <>
      <div className="layout categories">
        <div className="categories__header-row">
          <h1>Categories</h1>
          <Button onClick={handleAddClick}>Add category</Button>
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {categories.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <IconButton
                    icon={<Pencil />}
                    color="black"
                    onClick={() => handleEditClick(item)}
                  />
                  <IconButton
                    icon={<Trash />}
                    onClick={() => handleDeleteClick(item)}
                  />
                </TableCell>
              </TableRow>
            ))}
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
      </div>
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
