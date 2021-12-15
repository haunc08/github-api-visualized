import { useEffect, useState } from 'react';
import Container from './Container';
import Modal from './Modal';

export default function Page({ error, ...rest }) {
  const [showErrorModal, setShowErrorModal] = useState(false);
  useEffect(() => {
    if (error) setShowErrorModal(true);
  }, [error]);

  return (
    <main className="pt-main-p px-main-p">
      <Container {...rest} />
      <Modal
        header={
          <span className="text-red-600">
            <i className="bi bi-bug mr-2" />
            Error
          </span>
        }
        showSecondary={false}
        show={showErrorModal}
        onDefaultClose={setShowErrorModal}
        primaryText="Ok"
      >
        <b className="block">{error?.message}</b>
        <span className="text-gray-400">{JSON.stringify(error)}</span>
      </Modal>
    </main>
  );
}
