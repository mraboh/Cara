import DetailsContent from "./DetailsContent";

export default function DetailPage({ params }) {
  return <DetailsContent id={params.id} />;
}
