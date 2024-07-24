import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import Add from "@/components/icons/Add";

export default function ModalForm({ component, setComponents, setComponent, params, item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setComponent((prevComponent) => ({
      ...prevComponent,
      [name]: value,
    }));
  };

  
  const { id } = params;

  const addComponent = async (e) => {
    e.preventDefault();
    const data = {
      name: component.name,
      description: component.description,
    };
    const res = await axios.post(
      `http://localhost:3000/api/components/${id}`,
      data
    );
    // Actualizar el estado local con el nuevo componente
    setComponents((prevComponents) => [
      ...prevComponents,
      {
        _id: res.data.components[res.data.components.length - 1],
        name: component.name,
        description: component.description,
        isCompleted: false,
      },
    ]);

    setComponent({ name: "", description: "" });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Button isDisabled={item.completed} onPress={onOpen} color="primary" className="text-lg" isIconOnly>
        <Add />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Component
              </ModalHeader>
              <ModalBody>
                <form onSubmit={addComponent} className="flex flex-col gap-4">
                  <Input
                    autoFocus
                    label="Name"
                    variant="bordered"
                    onChange={handleInputs}
                    type="text"
                    name="name"
                    value={capitalizeFirstLetter(component.name)}
                  />
                  <Input
                    label="Description"
                    variant="bordered"
                    onChange={handleInputs}
                    type="text"
                    name="description"
                    value={component.description}
                  />
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      Add
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
