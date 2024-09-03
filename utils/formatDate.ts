const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("es-AR", {
    timeZone: "UTC",
  });
};

export default formatDate;
