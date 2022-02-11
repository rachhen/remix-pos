import { useIsSubmitting } from "remix-validated-form";
import { Box, Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

type SubmitButtonProps = ButtonProps & {
  text?: string;
  loadingText?: string;
};

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { text, loadingText } = props;
  const isSubmitting = useIsSubmitting();

  return (
    <Box>
      <Button
        type="submit"
        isLoading={isSubmitting}
        w={{ base: "full", md: "auto" }}
        {...props}
      >
        {isSubmitting ? loadingText : text}
      </Button>
    </Box>
  );
};

SubmitButton.defaultProps = {
  text: "Submit",
  loadingText: "Submitting...",
};
