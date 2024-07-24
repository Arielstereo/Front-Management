import {Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import ProyectForm from "@/components/ProyectForm";

const UpdateFormModal = ({item}) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <>
    <Button isDisabled={item.completed} onPress={onOpen} color="primary">Update</Button>
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
      size="full"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="flex justify-center items-center">
              <ProyectForm />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
  )
}

export default UpdateFormModal