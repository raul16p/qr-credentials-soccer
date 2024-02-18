const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center py-10">
      {children}
    </div>
  );
};

export default AuthLayout;
