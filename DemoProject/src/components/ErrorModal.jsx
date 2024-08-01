import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const ErrorModal = forwardRef(function ErrorModal({}, ref) {
  const dialog = useRef();

  // 외부 컴포넌트에서 이 컴포넌트를 관리할 때 코드 가독성과 유지보수를 위해 사용하는 훅
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md my-40"
      ref={dialog}
    >
      <h2 className="text-xl font-bold text-stone-700 my-4">
        Input Data is Invalid
      </h2>
      <form method="dialog" className="mt-4 text-right">
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
          Close
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default ErrorModal;
