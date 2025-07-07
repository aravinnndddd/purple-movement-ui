import { useState } from "react";
import Form, { type PopupContentType } from "../../components/Form";
import { HomePage } from "../../HomePage";
import CertificatePopup from "../../components/CertificatePopup";

const Home = () => {
  const [viewJoinModal, setViewJoinModal] = useState(false);

  const [certificateData, setCertificateData] = useState<PopupContentType>();
  const [totalCount, setTotalCount] = useState<number>();
  const onJoinUs = () => setViewJoinModal(true);
  const onClose = () => setViewJoinModal(false);
  const onResult = (res: PopupContentType) => {
    setCertificateData(res);
    if (res.count) setTotalCount(res.count);
    onClose();
  };

  return (
    <div>
      <Form onResult={onResult} isOpen={viewJoinModal} onClose={onClose} />

      {!!certificateData && (
        <CertificatePopup
          name={certificateData.name}
          contribution={certificateData.contribution}
          id={certificateData.id}
          onClose={() => setCertificateData(undefined)}
        />
      )}
      <HomePage onJoinUs={onJoinUs} value={totalCount} update={setTotalCount} />
    </div>
  );
};

export default Home;
