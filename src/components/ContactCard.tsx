import { useNavigate, useParams } from "react-router-dom";

import { Character } from "../types";

const ContactCard = ({ data }: { data: Character }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isActive = id === data.id.toString();

  const onClickHandler = () => {
    navigate(`/contacts/${data.id}`);
  };
  return (
    <div
      className={`tw-flex tw-cursor-pointer tw-items-center tw-gap-3 tw-p-2 hover:tw-bg-white/20 ${isActive ? "tw-bg-white/10" : ""}`}
      onClick={onClickHandler}
    >
      <img src={data.image} alt={data.name} className="tw-w-14 tw-rounded-full" />
      <div>
        <p className="tw-font-bold">{data.name}</p>
        <p className="tw-text-sm">{data.species}</p>
      </div>
    </div>
  );
};

export default ContactCard;
