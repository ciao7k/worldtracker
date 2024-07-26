import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; 返回
    </Button>
  );
}

export default BackButton;
