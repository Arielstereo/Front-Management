const Vercel = ({ className }) => {
  return (
    <div className={className}>
      <div className="block dark:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path fill="#000000" d="M24 22.525H0l12-21.05z" />
        </svg>
      </div>
      <div className="hidden dark:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path fill="#fff" d="M24 22.525H0l12-21.05z" />
        </svg>
      </div>
    </div>
  );
};

export default Vercel;
