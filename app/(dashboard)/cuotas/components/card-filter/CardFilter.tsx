"use client";

import { useEffect, useState } from "react";
import { tarjetaHandler } from "@/app/(dashboard)/tarjetas/components/TarjetasPage";
import { Tarjeta } from "@/interfaces/tarjeta.interface";
import { useRouter, useSearchParams } from "next/navigation";

const CardFilter = ({ cards }: { cards: Tarjeta[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCard, setSelectedCard] = useState<string>("");

  const card = searchParams.get("card") || null;

  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (!card) {
      setSelectedCard("");
      return;
    }

    setSelectedCard(card);
  }, [card]);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const card = e.target.value;

    params.set("card", card);

    router.push(`/cuotas?${params.toString()}`);
  };

  return (
    <select
      className="bg-transparent h-full border p-2 font-semibold rounded-lg"
      name="card"
      id="card"
      value={selectedCard}
      onChange={handleOnChange}
    >
      <option value="">Selecciona tu tarjeta</option>
      {cards.map((card) => (
        <option key={card._id} value={card._id}>
          {tarjetaHandler(card.brand)} {card.entity}
        </option>
      ))}
    </select>
  );
};

export default CardFilter;
