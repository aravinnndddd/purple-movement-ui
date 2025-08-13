import { useState } from "react";

import { HomePage } from "../../HomePage";
import Form from "../../components/Form";

const Home = () => {
  const [viewJoinModal, setViewJoinModal] = useState(false);

  const onJoinUs = () => setViewJoinModal(true);
  const onClose = () => setViewJoinModal(false);

  return (
    <div>
      <Form isOpen={viewJoinModal} onClose={onClose} />

      <HomePage onJoinUs={onJoinUs} />
    </div>
  );
};

export default Home;
