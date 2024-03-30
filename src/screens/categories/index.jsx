import {
  Modal,
  ModalBody,
  ModalContent,
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
import toast from "react-hot-toast";
import { Pencil, Trash } from "../../assets/icons";
import { Button, IconButton, LinkButton } from "../../components/button";
import DeleteCategoryModal from "../../components/category-delete-modal";
import { Input } from "../../components/input/index";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
} from "../../utils/category";
import "./styles.scss";

function CategoriesScreen() {
  const { categories } = useCategories();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isPending, setIsPending] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const handleAddClick = () => {
    setSelectedCategory(null);
    setCategoryName("");
    onOpen();
  };

  const handleModalConfirm = () => {
    setIsPending(true);
    if (selectedCategory) {
      updateCategory(
        { id: selectedCategory.id, name: categoryName },
        {
          onSuccess: () => {
            setIsPending(false);
            onOpenChange(false);
            console.log(
              `Category ${selectedCategory.id} updated successfully.`,
            );
            toast.success(`Category ${categoryName} updated successfully.`);
          },
          onError: (error) => {
            console.error(
              `Failed to update category ${selectedCategory.id}: ${error.message}`,
            );
            toast.error(
              `Failed to update category ${categoryName}: ${error.message}`,
            );

            setIsPending(false);
          },
        },
      );
    } else {
      createCategory(
        { name: categoryName },
        {
          onSuccess: () => {
            setIsPending(false);
            onOpenChange(false);
            console.log(`Category created successfully.`);
            toast.success(`Category created successfully.`);
          },
          onError: (error) => {
            console.error(`Failed to create category: ${error.message}`);
            toast.error(`Failed to create category: ${error.message}`);
            setIsPending(false);
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
    setDeletingCategory(category);
    onOpenDeleteModal();
  };

  const onCategoryDeleted = () => {
    setDeletingCategory(null);
    onCloseDeleteModal();
  };

  const columns = [
    { name: "Name", uid: "name" },
    { name: "Actions", uid: "actions" },
  ];

  return (
    <>
      <div className="layout categories">
        <LinkButton to="/tasks" className="link-button">
          Back to tasks
        </LinkButton>
        <div className="categories__header">
          <h1>Categories</h1>
          <Button onClick={handleAddClick} size="lg">
            Add category
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
            <ModalContent>
              {() => (
                <>
                  <ModalHeader>
                    {selectedCategory ? "Edit Category" : "Add Category"}
                  </ModalHeader>
                  <form id="category-form" onSubmit={handleModalConfirm}>
                    <ModalBody>
                      <Input
                        autoFocus
                        id="categoryName"
                        label="Category name"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="bordered" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        isLoading={isPending}
                        type="submit"
                        form="category-form"
                        auto
                        onPress={handleModalConfirm}
                        isDisabled={!categoryName.trim()}
                      >
                        {selectedCategory ? "Save" : "Add"}
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Table className="categories__table">
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
                    color="primary"
                    onClick={() => handleEditClick(item)}
                  />
                  <IconButton
                    icon={<Trash />}
                    color="danger"
                    onClick={() => handleDeleteClick(item)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={onCategoryDeleted}
        category={deletingCategory}
      />
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
