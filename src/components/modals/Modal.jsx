import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const ModalComponent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const deleteProyect = async () => {
    await axios.delete(`https://front-management.vercel.app/api/proyects/${id}`);
    router.push("/proyects");
  };

  return (
    <>
      <Button color="danger" onPress={onOpen}>
        Delete
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p className="mx-auto pt-2">Do you confirm to delete this project?</p>
              </ModalHeader>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={deleteProyect}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
