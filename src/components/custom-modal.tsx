import { Box, Modal, ModalProps } from "@mui/material";

const CustomModal: React.FC<ModalProps> = ({ children, ...others }) => {
  return (
    <Modal {...others}>
      <Box className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-3xl max-h-[90vh] overflow-y-scroll shadow-md p-4 z-50 bg-white dark:bg-gray-800 rounded-md">
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
