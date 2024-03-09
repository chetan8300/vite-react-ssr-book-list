import { createPortal } from "react-dom";
import { useRootDispatch } from './store/hooks'
import "./Modal.css";
import { createBook } from "./store/bookSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nextId: number;
}

const CreateModal = (props: Props) => {
  const dispatch = useRootDispatch();

  if (!props.isOpen) return null;
  return createPortal(
    <div className="modal">
      <div className="modal-container">
        <div className="modal-body">
          <h2>Create a new book</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = (document.getElementById("name") as HTMLInputElement).value;
              const description = (document.getElementById("description") as HTMLInputElement).value;
              const price = parseInt((document.getElementById("price") as HTMLInputElement).value)
              const category = (document.getElementById("category") as HTMLSelectElement).value
              if (!name || !description || !price || !category) {
                return;
              }
              dispatch(createBook({ id: props.nextId, name, description, price, category }));
              props.onClose();
            }}
          >
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input id="description" type="text" />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input id="price" type="number" />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select id="category">
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-fiction</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={props.onClose}>Close</button>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default CreateModal;
