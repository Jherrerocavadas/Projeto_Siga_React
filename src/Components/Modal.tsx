import "../styles/Modal.css";

// export interface IModal{
//     title: string;
//     description: string;
//     closeLabel: string;
//     isOpen: boolean;
//     setOpen: (isOpen: boolean) => void;
//    }

export function ModalInfo({
  title,
  description,
  closeLabel = "Fechar",
  error = null,
  setClose,
}) {
  // if(isOpen){
  return (
    <div className="modal-backdrop">
      <section>
        <div className="modal-container">
          <header>
            <h2>{title}</h2>
          </header>
          <div className="error-msg">
            <p>{description}</p>
          </div>
          <footer className="modal-close">
            <button
              type="button"
              onClick={() => {
                console.log(error);
                setClose(null);
              }}
            >
              {closeLabel}
            </button>
          </footer>
        </div>
      </section>
    </div>
  );
  // }
  // return <></>
}

export function ModalAction({
  title,
  description,
  okLabel = null,
  closeLabel = "Fechar",
  setClose,
  action,
}) {

function handleClose(){
    if(okLabel === null){
      action()
    }
    setClose(null);
  }
  return (
    <div className="modal-backdrop">
      <section>
        <div className="modal-container">
          <header>
            <h2>{title}</h2>
          </header>
          <div className="error-msg">
            <p>{description}</p>
          </div>
          <footer className="modal-close">
            <button
              type="button"
              onClick={() => handleClose()}
            >
              {closeLabel}
            </button>

            {okLabel !== null ? (
              <button
                type="button"
                onClick={() => {
                  action();
                  setClose(null);
                }}
              >
                {okLabel}
              </button>
            ) : (
              <></>
            )}
          </footer>
        </div>
      </section>
    </div>
  );
}
