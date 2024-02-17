import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Hubo un error en el servidor"
      backButtonHref="/auth/login"
      backButtonLabel="Regresar a página de inicio de sesión"
    >
      <div className="w-full flex justify-center items-center"></div>
    </CardWrapper>
  );
};
