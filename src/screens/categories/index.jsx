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
